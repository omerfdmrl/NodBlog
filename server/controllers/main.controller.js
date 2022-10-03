const Menu = require('../models/menu.model')
const Tag = require('../models/tag.model')

module.exports = {
    async info (req,res) {
        const informations = {
            favicon: req.settings.favicon,
            head: req.settings.head,
            logo: req.settings.logo,
            name: req.settings.name,
            url: req.settings.url,
            social: req.settings.site.social
        }
        const user = req.user ? {
            name: req.user.name,
            image: req.user.image,
            username: req.user.username,
            can: {
                'settings': req.user.role.permission.includes('admin-get-settings'),
                'menu': req.user.role.permission.includes('admin-get-menu'),
                'user': req.user.role.permission.includes('admin-get-user'),
                'group': req.user.role.permission.includes('admin-get-group'),
                'role': req.user.role.permission.includes('admin-get-role'),
                'report': req.user.role.permission.includes('admin-get-report'),
            }
        } : false
        const menu = await Menu.find({},{_id:1, title:1, href:1, menu:1, parent:1, icon:1}).populate({
            path: 'parent',
            select: '_id title href menu parent'
        }).lean()
        const tags = await Tag.find({},{_id:0, key:1}).sort('-count').limit(14)
        return res.json({status:1, informations, user, menu, tags, custom: req.settings.api.custom})
    },

    async tagList (req,res) {
        const tags = await Tag.find({},{_id:0, name:1, key:1, count:1})
        return res.json({status:1, tags})
    }
}