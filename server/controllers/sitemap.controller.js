const xml = require('xml')
const Blog = require('../models/blog.model')
const User = require('../models/user.model')
const Tag = require('../models/tag.model')
const Cache = require('../services/cache.service')
module.exports = {
    async index(req,res) {
        var xmlString = await Cache.get('sitemap-index')
        if(!req.settings.api.redis.sitemap.display || !xmlString){
            var today = new Date().toISOString()
            const pages = [
                {href : req.settings.url.backend + 'sitemap/blog'},
                {href : req.settings.url.backend + 'sitemap/user'},
                {href : req.settings.url.backend + 'sitemap/tag'}
            ]
            const xmlObject = {
                urlset: [
                    {
                        _attr: {
                            xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
                        }
                    },
                    ...pages.map((page) => {
                        return {
                            url: [
                                { loc: page.href },
                                { lastmod: today },
                                { changefreq: 'daily' },
                                { priority: 0.5 }
                            ]
                        }
                    })
                ]
            }
            xmlString = await xml(xmlObject)
            if(req.settings.api.redis.sitemap.display){
                Cache.set('sitemap-index', xmlString,req.settings.api.redis.sitemap.ttl)
            }
        }
        res.set('Content-Type', 'text/xml')
        res.send(xmlString)
    },

    async blog(req,res) {
        var xmlString = await Cache.get('sitemap-blog')
        if(!req.settings.api.redis.sitemap.display || !xmlString){
            const posts = await Blog.find({},{__id:1,slug:1,updated_at:1,created_at:1})
            const xmlObject = {
                urlset: [
                    {
                        _attr: {
                            xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
                        }
                    },
                    ...posts.map((post) => {
                        var lastmod = post.updated_at.toISOString() ? post.updated_at.toISOString() : (post.created_at.toISOString() ? post.created_at.toISOString() : new Date().toISOString())
                        return {
                            url: [
                                { loc: req.settings.url.site + 'post/' + post.slug + '/' + post.__id },
                                { lastmod },
                                { changefreq: 'daily' },
                                { priority: 1 }
                            ]
                        }
                    })
                ]
            }
            xmlString = await xml(xmlObject)
            if(req.settings.api.redis.sitemap.display){
                Cache.set('sitemap-blog', xmlString, req.settings.api.redis.sitemap.ttl)
            }
        }
        res.set('Content-Type', 'text/xml')
        res.send(xmlString)
    },

    async user(req,res) {
        var xmlString = await Cache.get('sitemap-user')
        if(!req.settings.api.redis.sitemap.display || !xmlString){
            const users = await User.find({},{username:1,updated_at:1,created_at:1})
            const xmlObject = {
                urlset: [
                    {
                        _attr: {
                            xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
                        }
                    },
                    ...users.map((user) => {
                        var lastmod = user.updated_at.toISOString() ? user.updated_at.toISOString() : (user.created_at.toISOString() ? user.created_at.toISOString() : new Date().toISOString())
                        return {
                            url: [
                                { loc: req.settings.url.site + 'profile/' + user.username },
                                { lastmod },
                                { changefreq: 'daily' },
                                { priority: 0.8 }
                            ]
                        }
                    })
                ]
            }
            xmlString = await xml(xmlObject)
            if(req.settings.api.redis.sitemap.display){
                Cache.set('sitemap-user', xmlString, req.settings.api.redis.sitemap.ttl)
            }
        }
        res.set('Content-Type', 'text/xml')
        res.send(xmlString)
    },

    async tag(req,res) {
        var xmlString = await Cache.get('sitemap-tag')
        if(!req.settings.api.redis.sitemap.display || !xmlString){
            const tags = await Tag.find({},{key:1,updated_at:1,created_at:1})
            const xmlObject = {
                urlset: [
                    {
                        _attr: {
                            xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
                        }
                    },
                    ...tags.map((tag) => {
                        var lastmod = tag.updated_at.toISOString() ? tag.updated_at.toISOString() : (tag.created_at.toISOString() ? tag.created_at.toISOString() : new Date().toISOString())
                        return {
                            url: [
                                { loc: req.settings.url.site + 'tag/' + tag.key },
                                { lastmod },
                                { changefreq: 'daily' },
                                { priority: 0.8 }
                            ]
                        }
                    })
                ]
            }
            xmlString = await xml(xmlObject)
            if(req.settings.api.redis.sitemap.display){
                Cache.set('sitemap-tag', xmlString, req.settings.api.redis.sitemap.ttl)
            }
        }
        res.set('Content-Type', 'text/xml')
        res.send(xmlString)
    }
}