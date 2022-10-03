const Setting = require('../models/settings.model')
const Validator = require('../services/validator.service')
const Blog = require('../models/blog.model')
const multiparty = require('multiparty')
const User = require('../models/user.model')
const fs = require('fs')
const Bcrypt = require('bcrypt')
const Index = require('../services/index.service.js')
const Upload = require('../services/upload.service')
const Redirect = require('../models/redirect.model')

module.exports = {
    async userGetEdit (req,res) {
        const user = {
            name: req.user.name,
            email: req.user.email,
            image: req.user.image,
            notification: req.user.notification,
            fac: req.user.fac,
            username: req.user.username,
            about: req.user.about,
            social: req.user.social
        }
        return res.json({status:1, user})
    },
    async userSaveEdit (req,res) {
        const {name, email, fac, pass, notification, about, social} = req.body
        var updateData = {}
        if(Validator.isEmpty(name.first)){
            return res.json({status: 0, message: 'firstname_required'})
        }
        if(Validator.isEmpty(name.last)){
            return res.json({status: 0, message: 'lastname_required'})
        }
        updateData.name = name
        if(email !== req.user.email && Validator.isEmail(email)){
            const user = await User.findOne({email})
            if(user){
                return res.json({status : 0, message : "email_is_already_exists"})
            }
            updateData.email = email
            updateData.verify = null
        }
        if(!Validator.isEmpty(fac) && !Validator.isEmpty(fac.type)){
            updateData.fac = {}
            updateData.fac.type = fac.type
        }
        if(!Validator.isEmpty(pass)){
            const compare = await Bcrypt.compare(pass.current,req.user.password)
            if(!compare){
                return res.json({status : 0, message : "wrong_password"})
            }
            if(!Validator.isStrong(pass.new)){
                return res.json({status: 0, message: 'password_is_not_strong_enough'})
            }
            if(!Validator.isEqual([pass.new, pass.confirm])){
                return res.json({status: 0, message: 'new_password_and_confirm_password_should_match'})
            }
            const hash = await Bcrypt.hash(pass.new, 10)
            updateData.password = hash
        }
        updateData.notification = notification
        updateData.social = social
        updateData.about = about
        User.findOneAndUpdate({_id: req.user._id},updateData,{}, (err,doc) => err ? console.log(err) : null)
        return res.json({status:1, message: 'successfully_saved'})
    },
    async userChangeImage(req,res){
        const form = new multiparty.Form();
        form.parse(req, async function(err, fields, files) {
            var image = files.image
            if(!image) {
                return res.json({status:0, message: 'image_cant_upload'})
            }
            const upload = await Upload.file(image[0],req.user._id,'user')
            if(upload.status == 0){
                return res.json(upload)
            }
            User.findOneAndUpdate({_id: req.user._id},{image: upload.url},{}, (err,doc) => err ? console.log(err) : null)
            return res.json({status:1, message: 'image_uploaded_successfully'})
        });
    },
    async blogList (req,res) {
        const {perPage,currentPage,search} = req.body
        if(!Validator.isNumber(perPage) || !Validator.isNumber(currentPage)){
            return res.json({status :0})
        }
        var query = {}
        if(search){
            query.title = {$regex : search, $options: 'i'}
        }
        query.user = req.user._id
        const items = await Blog.find(query,{_id:0, __id:1, title:1, status:1, created_at:1, slug:1}).skip(perPage * currentPage).limit(perPage).sort('-created_at').lean()
        const total = await Blog.find(query).count().lean()
        const pageCount = Math.ceil(total / perPage)
        return res.json({status:1 , items, pageCount, total})
    },
    async blogAdd (req,res) {
        const {title,status,excerpt,content,slug,image,tag,site,resource} = req.body
        if(Validator.isEmpty(status) || !['draft','pending','published'].includes(status)){
            return res.json({status: 0, message: 'status_required'})
        }
        if(Validator.isEmpty(title)){
            return res.json({status: 0, message: 'title_required'})
        }
        if(Validator.isEmpty(excerpt)){
            return res.json({status: 0, message: 'excerpt_required'})
        }
        if(Validator.isEmpty(content)){
            return res.json({status: 0, message: 'content_required'})
        }
        if(!Validator.isEmpty(resource)){
            for await (let element of resource){
                if(!Validator.isWebsite(element)){
                    return res.json({status: 0, message: 'resource_must_be_valid_website'})
                }
            }
        }
        const insert = await new Blog({title, excerpt, content, slug, status, image, tag, resource, user: req.user._id}).save()
        Index.updated(`post/${insert.slug}/${insert.__id}`)
        return res.json({status:1, message: 'successfully_saved', redirect: site ? 'site-home' : 'panel-blog-list'})
    },
    async blogGetEdit (req,res) {
        const {slug, id} = req.body
        const blog = await Blog.findOne({slug, user: req.user._id, __id: id},{_id:0, title:1, slug:1, content:1, excerpt:1, status:1, tag:1, resource:1}).lean()
        if(!blog){
            return res.json({status:0, redirect: 'panel-blog-list'})
        }
        return res.json({status:1, blog})
    },
    async blogSaveEdit (req,res) {
        const {title,status,excerpt,content,image,tag,slug,oldSlug,id,resource} = req.body
        const blog = await Blog.findOne({slug: oldSlug, user: req.user._id, __id: id},{_id:1}).lean()
        if(!blog){
            return res.json({status:0, redirect: 'panel-blog-list'})
        }
        if(oldSlug !== slug){
            new Redirect({blog: blog._id, slug: oldSlug, __id: id}).save()
        }
        if(Validator.isEmpty(status) || !['draft','pending','published'].includes(status)){
            return res.json({status: 0, message: 'status_required'})
        }
        if(Validator.isEmpty(title)){
            return res.json({status: 0, message: 'title_required'})
        }
        if(Validator.isEmpty(excerpt)){
            return res.json({status: 0, message: 'excerpt_required'})
        }
        if(Validator.isEmpty(content)){
            return res.json({status: 0, message: 'content_required'})
        }
        if(!Validator.isEmpty(resource)){
            for await (let element of resource){
                if(!Validator.isWebsite(element)){
                    return res.json({status: 0, message: 'resource_must_be_valid_website'})
                }
            }
        }
        Blog.findOneAndUpdate({_id: blog._id, user: req.user._id},{title, excerpt, content, slug, status, image, tag, resource},{}, (err,doc) => err ? console.log(err) : null)
        Index.updated(`post/${slug}/${id}`)
        return res.json({status:1, message: 'successfully_saved', 'redirect': 'panel-blog-list'})
    },
    async blogDelete (req,res) {
        const {slug, __id} = req.body
        const blog = await Blog.findOne({slug, user: req.user._id, __id},{_id:1}).lean()
        if(!blog){
            return res.json({status:0, redirect: 'panel-blog-list'})
        }
        Blog.findOneAndDelete({_id: blog._id}, (err,doc) => err ? console.log(err) : null)
        Redirect.deleteMany({blog: blog._id}, (err,doc) => err ? console.log(err) : null)
        return res.json({status:1, message: 'successfully_deleted'})
    },
}