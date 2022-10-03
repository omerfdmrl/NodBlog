const Validator = require('../services/validator.service')
const Blog = require('../models/blog.model')
const User = require('../models/user.model')
const Follow = require('../models/follow.model')
const Comment = require('../models/comment.model')
const Report = require('../models/report.model')
const Tag = require('../models/tag.model')
const Recommendation = require('../services/recommendation.service')
const Cache = require('../services/cache.service')
const Redirect = require('../models/redirect.model')

module.exports = {
    async home (req,res) {
        const tags = await Tag.find({},{_id:0, key:1, count:1}).sort('-count').limit(6).lean()
        const users = await Blog.aggregate([
            { "$group": { 
                "_id": '$user', 
                "likeCount": { "$sum": "$stats.like" },
                "blogCount": {"$sum": 1}
            }},
            { "$lookup": {
                from : 'follows',
                localField : '_id',
                foreignField : 'follower',
                as: 'follows',
                pipeline : [
                    { "$group": {
                        "_id": "$user",
                        "followerCount": { "$sum": 1 }
                    } }
                ]
            } },
            { "$sort": { "likeCount": -1 } }
        ])
        await User.populate(users,{path: '_id', select: '-_id name username image'})
        return res.json({status:1, tags, users})
    },
    async homeBlog (req,res) {
        const {page, content} = req.body
        if(!Validator.isNumber(page)){
            return res.sendStatus(404)
        }
        var recommends = [];
        var items = []
        var skip = page * req.settings.site.blog.home_pagination;
        var take = skip + req.settings.site.blog.home_pagination - 1
        if(req.user && !content){
            recommends = await Recommendation.recommend(req.user._id,skip,take)
        }
        if(((req.user && !recommends.length) || !req.user) && !content){
            recommends = await Recommendation.bestRated(skip,take)
        }
        if(content){
            items = await Blog.find({status: 'published'}, {_id:0, __id:1, title:1, slug:1, image:1, content:1, excerpt:1, tag:1, user:1, created_at:1}).populate({
                path: 'user',
                select: '-_id name username image'
            }).skip(req.settings.site.blog.home_pagination * page).limit(req.settings.site.blog.home_pagination).lean()
        }
        if(!content){
            for await (const element of recommends) {
                const exploded = element.split('-'),
                      type = exploded[0],
                      _id = exploded[1]
                switch (type) {
                    case 'user':
                        if(req.settings.api.recommendation.user){
                            var _u = await User.findOne({_id},{_id:1, name:1, username:1, image:1, about:1, social:1, group:1}).populate({
                                path: 'group',
                                select: '-_id title'
                            }).lean()
                            if(_u){
                                const _i = req.user ? (await Follow.count({follower: _u._id, following: req.user._id}).lean() ? true : false) : false
                                _u.type = 'user'
                                _u._id = null
                                _u.is = _i
                                items.push(_u)
                            }
                        }
                        break;
                    case 'comment':
                        if(req.settings.api.recommendation.comment){
                            var _c = await Comment.findOne({_id, blog: { $ne: null }},{_id:0, user:1, content:1, blog:1}).populate({
                                path: 'user',
                                select: '-_id name username image'
                            }).populate({
                                path: 'blog',
                                select: '-_id __id slug'
                            }).lean()
                            if(_c){
                                _c.type = 'comment'
                                items.push(_c)
                            }
                        }
                        break;
    
                    case 'blog':
                        if(req.settings.api.recommendation.blog){
                            var _b = await Blog.findOne({__id: _id, status: 'published'}, {_id:0, __id:1, title:1, slug:1, image:1, content:1, excerpt:1, tag:1, user:1, created_at:1}).populate({
                                path: 'user',
                                select: '-_id name username image'
                            }).lean()
                            if(_b){
                                _b.type = 'blog'
                                items.push(_b)
                            }
                        }
                        break;
                }
            }
        }
        return res.json({status:1, items, loadable: items.length})
    },
    async homePopular(req,res){
        const {day} = req.body
        if(!Validator.isNumber(day)){
            return res.sendStatus(404)
        }
        const date = new Date();
        date.setDate(date.getDate() - day);
        const popular = await Blog.find({
            created_at: {
                $gte: date
            }
        },{_id:0, __id:1, slug:1, title:1, content:1, excerpt:1, image:1, user:1, created_at:1}).populate({
            path: 'user',
            select: '-_id name image username'
        }).sort({'stats.like': -1}).limit(8)
        return res.json({status:1, popular})
    },
    async blogIndex (req,res) {
        const {id, post} = req.body
        const Post = await Blog.findOne({slug: post, __id: id, status: 'published'}, {_id:1, title:1, content:1, excerpt:1, image:1, user:1, created_at:1, tag:1, resource:1, 'stats.like': 1}).populate({
            path: 'user',
            select: '_id name image username about social created_at'
        }).lean()
        if(!Post){
            const redirect = await Redirect.findOne({__id: id, slug: post})
            if(redirect){
                const redirectPost = await Blog.findOne({_id: redirect.blog},{__id:1, slug:1})
                return res.status(301).json({status:0, redirect: 'site-blog-index', params: { id: redirectPost.__id, post: redirectPost.slug }})
            }
            return res.status(404).json({status:0, redirect: 'error', params: {code: 404}})
        }
        const followers = await Follow.count({follower: Post.user._id}).lean()
        const comments = await Comment.find({blog: Post._id},{_id:1, content:1, user:1, created_at:1, 'stats.like': 1}).populate({
            path: 'user',
            select: '-_id name image username'
        }).sort('-created_at').lean()
        Blog.findOneAndUpdate({_id: Post._id},{$inc: { 'stats.view': 1 }},{}, (err,doc) => err ? console.log(err) : null)
        Post._id = null
        Post.user._id = null
        return res.json({status:1, post: Post, followers, comments})
    },
    async blogLike (req,res) {
        const {id, post} = req.body
        Blog.findOneAndUpdate({slug: post, __id: id, status: 'published'},{$inc: { 'stats.like': 1 }},{}, (err,doc) => err ? console.log(err) : null)
        if(req.settings.api.recommendation.blog){
            Recommendation.like('blog',req.user._id, id)
        }
        return res.json({status:1})
    },
    async blogReport (req,res) {
        const {id, post, reason} = req.body
        const Post = await Blog.findOne({slug: post, __id: id, status: 'published'}, {_id:1}).lean()
        if(!Post || Validator.isEmpty(reason) || !['spam','against_community_rules','rules_violation'].includes(reason)){
            return res.status(404)
        }
        new Report({user: req.user._id, blog: Post._id, reason, status: 'active'}).save()
        if(req.settings.api.recommendation.blog){
            Recommendation.dislike('blog',req.user._id, id)
        }
        return res.json({status:1, message: 'successfully_reported'})
    },
    async blogDislike (req,res) {
        const {id, post} = req.body
        const Post = await Blog.findOne({slug: post, __id: id, status: 'published'}, {_id:1}).lean()
        if(!Post){
            return res.status(404)
        }
        if(req.settings.api.recommendation.blog){
            Recommendation.dislike('blog',req.user._id, id)
        }
        return res.json({status:1, message: 'successfully_disliked_you_will_see_less_blogs_like_this'})
    },
    async commentReport (req,res) {
        const {id, post, reason, comment} = req.body
        const Post = await Blog.findOne({slug: post, __id: id, status: 'published'}, {_id:1}).lean()
        if(!Post || Validator.isEmpty(reason) || !['spam','against_community_rules','rules_violation'].includes(reason)){
            return res.status(404)
        }
        new Report({user: req.user._id, blog: Post._id, reason, comment, status: 'active'}).save()
        if(req.settings.api.recommendation.comment){
            Recommendation.dislike('comment',req.user._id, comment)
        }
        return res.json({status:1, message: 'successfully_reported'})
    },
    async commentLike (req,res) {
        const {id, post, comment} = req.body
        const Post = await Blog.findOne({slug: post, __id: id, status: 'published'}, {_id:1}).lean()
        if(!Post){
            return res.status(404)
        }
        Comment.findOneAndUpdate({blog: Post._id, _id: comment},{$inc: { 'stats.like': 1 }},{}, (err,doc) => err ? console.log(err) : null)
        if(req.settings.api.recommendation.comment){
            Recommendation.like('comment',req.user._id, comment)
        }
        return res.json({status:1})
    },
    async commentAdd (req,res) {
        const {id, post, content} = req.body
        if(Validator.isEmpty(content) || content.length < 50){
            return res.json({status: 0, message: 'content_required'})
        }
        const Post = await Blog.findOne({slug: post, __id: id, status: 'published'}, {_id:1}).lean()
        if(!Post){
            return res.status(404).json({status:0, redirect: 'error', params: {code: 404}})
        }
        new Comment({user: req.user._id, blog: Post._id, content},{}).save()
        if(req.settings.api.recommendation.comment){
            Recommendation.like('blog',req.user._id, id)
        }
        return res.json({status:1})
    },
    async profile (req,res) {
        const {username} = req.body
        const profile = await User.findOne({username},{_id:1, username:1, name:1, about:1, social:1, image:1, about:1, group:1}).populate({
            path: 'group',
            select: '-_id title'
        }).lean()
        if(!profile){
            return res.sendStatus(404)
        }
        const postCount = await Blog.count({user: profile._id, status: 'published'}).lean()
        const posts = await Blog.find({user: profile._id, status: 'published'},{_id:0, title:1, content:1, excerpt:1, image:1, created_at:1, slug:1, __id:1}).skip(0).limit(req.settings.site.blog.profile_pagination).lean()
        const isFollowing = req.user ? (await Follow.count({follower: profile._id, following: req.user._id}).lean() ? true : false) : false
        const followers = await Follow.count({follower: profile._id}).lean()
        profile._id = null
        return res.json({status:1, profile, postCount, posts, followers, isFollowing})
    },
    async profileBlog (req,res) {
        const {username, page} = req.body
        const profile = await User.findOne({username},{_id:1}).lean()
        if(!profile || !Validator.isNumber(page)){
            return res.sendStatus(404)
        }
        const posts = await Blog.find({user: profile._id, status: 'published'},{_id:0, title:1, content:1, excerpt:1, image:1, created_at:1, slug:1, __id:1}).skip(page * req.settings.site.blog.profile_pagination).limit(req.settings.site.blog.profile_pagination).lean()
        profile._id = null
        return res.json({status:1, posts})
    },
    async profileFollow (req,res) {
        const {username} = req.body
        const profile = await User.findOne({username},{_id:1}).lean()
        if(!profile){
            return res.sendStatus(404)
        }
        const isFollowing = await Follow.count({follower: profile._id, following: req.user._id}).lean()
        if(isFollowing){
            Follow.findOneAndDelete({follower: profile._id, following: req.user._id}, (err,doc) => err ? console.log(err) : null)
            if(req.settings.api.recommendation.user){
                Recommendation.unlike('user',req.user._id, profile._id)
            }
        }else {
            const insert = new Follow({follower: profile._id, following: req.user._id}).save()
            if(req.settings.api.recommendation.user){
                Recommendation.like('user',req.user._id, insert._id)
            }
        }
        return res.json({status:1})
    },
    async tagIndex (req,res) {
        const {tag} = req.body
        const posts = await Blog.find({tag: tag, status: 'published'},{_id:0, __id:1, title:1, image:1, excerpt:1, content:1, slug:1, user:1, created_at:1}).populate({
            path: 'user',
            select: '-_id name image username'
        }).limit(req.settings.site.blog.tag_pagination).lean()
        return res.json({status:1, posts, loadable: posts.length == req.settings.site.blog.tag_pagination})
    },
    async tagBlog (req,res) {
        const {tag, page} = req.body
        if(!Validator.isNumber(page)){
            return res.sendStatus(404)
        }
        const posts = await Blog.find({tag: tag, status: 'published'},{_id:0, __id:1, title:1, image:1, excerpt:1, content:1, slug:1, user:1, created_at:1}).populate({
            path: 'user',
            select: '-_id name image username'
        }).skip(page * req.settings.site.blog.tag_pagination).limit(req.settings.site.blog.tag_pagination).lean()
        return res.json({status:1, posts, loadable: posts.length == req.settings.site.blog.tag_pagination})
    },
    async search (req,res) {
        const {data} = req.body
        const posts = await Blog.find({title: {$regex : data, $options: 'i'}},{_id:0, __id:1, title:1, image:1, slug:1, tag:1}).populate({
            path: 'tag',
            select: '-_id key'
        }).limit(10)
        return res.json({status:1, posts})
    }
}