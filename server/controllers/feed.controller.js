const xml = require('xml')
const Blog = require('../models/blog.model')
const Tag = require('../models/tag.model')
const Feed = require('feed').Feed
const Cache = require('../services/cache.service')
module.exports = {
    async index(req,res) {
        var feed = await Cache.get('feed-index')
        if(!req.settings.api.redis.rss.display || !feed){
            const blogs = await Blog.find({},{title:1, __id:1, slug:1, excerpt:1, content:1, user:1, image:1, created_at:1}).populate({
                path: 'user',
                select: 'name username'
            })
    
            const tags = await Tag.find({},{key: 1})
    
            feed = new Feed({
                title: req.settings.head.title,
                description: req.settings.head.meta.description,
                id: req.settings.url.site,
                link: req.settings.url.site,
                language: "tr",
                image: req.settings.logo.value,
                favicon: req.settings.favicon,
                copyright: `All rights reserved ${new Date().getFullYear()}, ${req.settings.name}`,
                updated: new Date(2013, 6, 14),
                generator: "awesome",
            });
    
            blogs.forEach(post => {
                feed.addItem({
                  title: post.title,
                  id: post.__id,
                  link: req.settings.url.site + 'post/' + post.slug + '/' + post.__id,
                  description: post.excerpt,
                  content: post.content,
                  author: [
                    {
                      name: Object.values(post.user.name).join(' '),
                      link: req.settings.url.site + 'profile/' + post.user.username,
                    }
                  ],
                  date: post.created_at,
                  image: post.image
                });
            });
    
            tags.forEach(tag => {
                feed.addCategory(tag.key);
            })
            
            if(req.settings.api.redis.rss.display){
                Cache.set('feed-index', JSON.stringify(feed),req.settings.api.redis.rss.ttl)
            }
        }else {
            feed = JSON.parse(feed)
        }

        res.set('Content-Type', 'application/rss+xml')
        res.send(feed)
    }
}