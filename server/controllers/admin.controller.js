const Setting = require('../models/settings.model')
const Menu = require('../models/menu.model')
const User = require('../models/user.model')
const Role = require('../models/role.model')
const Group = require('../models/group.model')
const Report = require('../models/report.model')
const Comment = require('../models/comment.model')
const Blog = require('../models/blog.model')
const Validator = require('../services/validator.service')
const multiparty = require('multiparty')
const fs = require('fs')
const Index = require('../services/index.service.js')

module.exports = {
    async getSettings (req,res) {
        return res.json({status: 1, settings: req.settings})
    },
    async changeImage (req,res) {
        const form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
            var image = files.image
            var type = fields.type
            if(!image){
                return res.json({status:0, message: 'image_cant_upload'})
            }
            image = image[0]
            if(!Validator.isImage(image) || Validator.maxSize(image,150) || !type || ['favicon','logo','email_logo'].includes(type)){
                return res.json({status:0, message: 'image_cant_upload'})
            }
            const uploadPath = global.__basedir + '/public/'
            const extension = image.originalFilename.substr(image.originalFilename.lastIndexOf('.')+1, image.originalFilename.length)
            if(!fs.existsSync(uploadPath)){
                fs.mkdirSync(uploadPath)
            }
            const uploadUrl = req.settings.url.backend + 'public/' + type + '.' + extension
            fs.promises.copyFile(image.path,uploadPath + type + '.' + extension)
            if(type == 'favicon'){
                Setting.findOneAndUpdate({},{favicon: uploadUrl},{}, (err,doc) => err ? console.log(err) : null)
            }else if(type == 'logo') {
                Setting.findOneAndUpdate({},{logo: {type: 'image', value: uploadUrl}},{}, (err,doc) => err ? console.log(err) : null)
            }else if(type == 'email_logo') {
                Setting.findOneAndUpdate({},{'email.logo': uploadUrl},{}, (err,doc) => err ? console.log(err) : null)
            }else if(type == 'email_favicon') {
                Setting.findOneAndUpdate({},{'email.favicon': uploadUrl},{}, (err,doc) => err ? console.log(err) : null)
            }
            return res.json({status:1, message: 'image_uploaded_successfully'})
        });
    },
    async saveSettings (req,res) {
        const {url, logo, name, email, smtp, head, site, api} = req.body
        var updateData = {}
        if(Validator.isEmpty(name)){
            return res.json({status:0, message: 'site_name_required'})
        }
        updateData.name = name
        if(Validator.isEmpty(url)){
            return res.json({status:0, message: 'site_and_backend_url_required'})
        }
        if(!Validator.isWebsite(url.site)){
            return res.json({status:0, message: 'invalid_site_url'})
        }
        if(!Validator.isWebsite(url.backend)){
            return res.json({status:0, message: 'invalid_backend_url'})
        }
        updateData.url = url
        if(Validator.isEmpty(logo) || Validator.isEmpty(logo.value)){
            return res.json({status:0, message: 'logo_required'})
        }
        updateData.logo = logo
        if(Validator.isEmpty(email)){
            return res.json({status:0, message: 'email_required'})
        }
        if(Validator.isEmpty(email.title)){
            return res.json({status:0, message: 'email_title_required'})
        }
        if(!Validator.isWebsite(email.url)){
            return res.json({status:0, message: 'email_url_required'})
        }
        updateData.email = email
        updateData.smtp = smtp
        updateData.head = head
        if(!Validator.isNumber(site.blog.profile_pagination) || !Validator.isNumber(site.blog.home_pagination) || !Validator.isNumber(site.blog.tag_pagination)){
            return res.json({status:0, message: 'pagination_must_be_valid_number'})
        }
        updateData.site = site
        if(!Validator.isEmpty(api.index.display) && (Validator.isEmpty(api.index.email) || Validator.isEmpty(api.index.key))){
            return res.json({status:0, message: 'google_index_informations_required'})
        }
        if(!Validator.isEmpty(api.aws.display) && (Validator.isEmpty(api.aws.bucket) || Validator.isEmpty(api.aws.region) || Validator.isEmpty(api.aws.secret) || Validator.isEmpty(api.aws.access))){
            return res.json({status:0, message: 'aws_informations_required'})
        }
        if(!Validator.isEmpty(api.drive.display) && (Validator.isEmpty(api.drive.client) || Validator.isEmpty(api.drive.secret) || Validator.isEmpty(api.drive.redirect) || Validator.isEmpty(api.drive.refresh))){
            return res.json({status:0, message: 'drive_informations_required'})
        }
        if(!Validator.isEmpty(api.redis.sitemap.display) && !Validator.isNumber(api.redis.sitemap.ttl)){
            return res.json({status:0, message: 'ttl_must_be_valid_number'})
        }
        updateData.api = api
        Setting.findOneAndUpdate({},updateData,{}, (err,doc) => err ? console.log(err) : null)
        return res.json({status: 1, message: 'successfully_saved'})
    },
    async menuList (req,res) {
        const {perPage,currentPage,search,menu} = req.body
        if(!Validator.isNumber(perPage) || !Validator.isNumber(currentPage) || !['header','footer','left'].includes(menu)){
            return res.json({status: 0})
        }
        var query = {}
        if(search){
            query.title = {$regex : search, $options: 'i'}
        }
        query.menu = menu
        const items = await Menu.find(query).skip(perPage * currentPage).limit(perPage).sort('-created_at').lean()
        const total = await Menu.find(query).count().lean()
        const pageCount = Math.ceil(total / perPage)
        return res.json({status:1 , items, pageCount, total})
    },
    async menuAdd (req,res) {
        const {title, icon, href, menu, parent} = req.body
        if(Validator.isEmpty(title)){
            return res.json({status:0, message: 'title_required'})
        }
        if(Validator.isEmpty(menu) || !['header','footer','left'].includes(menu)){
            return res.json({status: 0})
        }
        if(Validator.isEmpty(href.type) || !['url','router'].includes(href.type)){
            return res.json({status: 0})
        }
        if(href.type == 'url' && (Validator.isEmpty(href.target) || !['_self','_blank'].includes(href.target))){
            return res.json({status: 0})
        }
        if(Validator.isEmpty(href.value)){
            return res.json({status: 0, message: 'menu_value_required'})
        }
        if(!Validator.isEmpty(href.params)){
            href.params = JSON.stringify(href.params)
        }
        new Menu({title,icon,href,menu,parent}).save()
        return res.json({status:1, message: 'successfully_saved'})
    },
    async menuSave (req,res) {
        const {title, icon, href, menu, parent, _id} = req.body
        if(Validator.isEmpty(title)){
            return res.json({status:0, message: 'title_required'})
        }
        if(Validator.isEmpty(menu) || !['header','footer','left'].includes(menu)){
            return res.json({status: 0})
        }
        if(Validator.isEmpty(href.type) || !['url','router'].includes(href.type)){
            return res.json({status: 0})
        }
        if(href.type == 'url' && (Validator.isEmpty(href.target) || !['_self','_blank'].includes(href.target))){
            return res.json({status: 0})
        }
        if(Validator.isEmpty(href.value)){
            return res.json({status: 0, message: 'menu_value_required'})
        }
        if(!Validator.isEmpty(href.params)){
            href.params = JSON.stringify(href.params)
        }
        Menu.findOneAndUpdate({_id},{title,icon,href,menu,parent},{}, (err,doc) => err ? console.log(err) : null)
        return res.json({status:1, message: 'successfully_saved'})
    },
    async menuDelete (req,res) {
        const {_id} = req.body
        Menu.findOneAndDelete({_id}, (err,doc) => err ? console.log(err) : null)
        return res.json({status:1, message: 'successfully_saved'})
    },
    async userList (req,res) {
        const {perPage,currentPage,search} = req.body
        if(!Validator.isNumber(perPage) || !Validator.isNumber(currentPage)){
            return res.json({status: 0})
        }
        var query = {}
        if(search){
            query.$or = [
                {title: search},
                {email: search}
            ]
        }
        const items = await User.find(query).skip(perPage * currentPage).limit(perPage).sort('-created_at').lean()
        const total = await User.find(query).count().lean()
        const pageCount = Math.ceil(total / perPage)
        return res.json({status:1 , items, pageCount, total})
    },
    async userSave (req,res) {
        const {name, email, oldEmail, group, role, _id} = req.body
        var updateData = {}
        if(Validator.isEmpty(name.first)){
            return res.json({status: 0, message: 'firstname_required'})
        }
        if(Validator.isEmpty(name.last)){
            return res.json({status: 0, message: 'lastname_required'})
        }
        updateData.name = name
        if(!Validator.isEmail(email)){
            return res.json({status: 0, message: 'email_required'})
        }
        if(oldEmail !== email){
            const user = await User.findOne({email})
            if(user){
                return res.json({status : 0, message : "email_is_already_exists"})
            }
            updateData.email = email
            updateData.verify = verify
        }
        updateData.role = role
        updateData.group = group
        User.findOneAndUpdate({_id},updateData,{}, (err,doc) => err ? console.log(err) : null)
        return res.json({status: 1, message: 'successfully_saved'})
    },
    async userLoginAs(req,res) {
        const { _id } = req.body
        req.session.loginAs = req.user._id
        req.session.user = _id
        return res.json({status:1, redirect: 'panel-dashboard', refresh: true})
    },
    async userChangeImage(req,res){
        const form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
            var image = files.image
            var user = fields.user
            if(!image){
                return res.json({status:0, message: 'image_cant_upload'})
            }
            image = image[0]
            if(!Validator.isImage(image) || Validator.maxSize(image,150)){
                return res.json({status:0, message: 'image_cant_upload'})
            }
            if(Validator.isEmpty(user)){
                return res.json({status: 0})
            }
            user = user[0]
            const uploadPath = global.__basedir + '/public/user/'
            if(!fs.existsSync(uploadPath)){
                fs.mkdirSync(uploadPath)
            }
            const extension = image.originalFilename.substr(image.originalFilename.lastIndexOf('.')+1, image.originalFilename.length)
            const uploadUrl = req.settings.url.backend + 'public/user/' + user + '.' + extension
            fs.promises.copyFile(image.path,uploadPath + user + '.' + extension)
            User.findOneAndUpdate({_id: user},{image: uploadUrl},{}, (err,doc) => err ? console.log(err) : null)
            return res.json({status:1, message: 'image_uploaded_successfully'})
        });
    },
    async groupList (req,res) {
        const {perPage,currentPage,search} = req.body
        if(!Validator.isNumber(perPage) || !Validator.isNumber(currentPage)){
            return res.json({status: 0})
        }
        var query = {}
        if(search){
            query.title = {$regex : search, $options: 'i'}
        }
        const items = await Group.find(query).skip(perPage * currentPage).limit(perPage).sort('-created_at').lean()
        const total = await Group.find(query).count().lean()
        const pageCount = Math.ceil(total / perPage)
        return res.json({status:1 , items, pageCount, total})
    },
    async groupAdd (req,res) {
        const {title, isDefault} = req.body
        if(Validator.isEmpty(title)){
            return res.json({status: 0, message: 'title_required'})
        }
        new Group({title, default: isDefault ?? false}).save()
        return res.json({status:1, message: 'successfully_saved'})
    },
    async groupSave (req,res) {
        const {title, isDefault, _id} = req.body
        if(Validator.isEmpty(title)){
            return res.json({status: 0, message: 'title_required'})
        }
        Group.findOneAndUpdate({_id},{title, default: isDefault ?? false},{}, (err,doc) => err ? console.log(err) : null)
        return res.json({status:1, message: 'successfully_saved'})
    },
    async groupDelete (req,res) {
        const {_id} = req.body
        Group.findOneAndDelete({_id}, (err,doc) => err ? console.log(err) : null)
        return res.json({status:1, message: 'successfully_saved'})
    },
    async roleList (req,res) {
        const {perPage,currentPage,search} = req.body
        if(!Validator.isNumber(perPage) || !Validator.isNumber(currentPage)){
            return res.json({status: 0})
        }
        var query = {}
        if(search){
            query.title = {$regex : search, $options: 'i'}
        }
        const items = await Role.find(query).skip(perPage * currentPage).limit(perPage).sort('-created_at').lean()
        const total = await Role.find(query).count().lean()
        const pageCount = Math.ceil(total / perPage)
        return res.json({status:1 , items, pageCount, total})
    },
    async roleAdd (req,res) {
        const {title, permission, isDefault, isBanned} = req.body
        if(Validator.isEmpty(title)){
            return res.json({status: 0, message: 'title_required'})
        }
        new Role({title, permission, default: isDefault ?? false, banned: isBanned ?? false}).save()
        return res.json({status:1 , message: 'successfully_saved'})
    },
    async roleSave (req,res) {
        const {title, permission, isDefault, isBanned, _id} = req.body
        if(Validator.isEmpty(title)){
            return res.json({status: 0, message: 'title_required'})
        }
        Role.findOneAndUpdate({_id},{title, permission, default: isDefault ?? false, banned: isBanned ?? false},{}, (err,doc) => err ? console.log(err) : null)
        return res.json({status:1 , message: 'successfully_saved'})
    },
    async permissionList (req,res) {
        const permissions = Role.schema.path('permission').caster.enumValues
        return res.json({status:1 , permissions})
    },
    async reportList (req,res) {
        const {perPage,currentPage,status, search} = req.body
        if(!Validator.isNumber(perPage) || !Validator.isNumber(currentPage)){
            return res.json({status: 0})
        }
        var query = {}
        if(search){
            query.title = {$regex : search, $options: 'i'}
        }
        query.status = status
        const items = await Report.find(query).skip(perPage * currentPage).limit(perPage).sort('-created_at').populate({
            path: 'blog',
            select: '_id __id title content slug user',
            populate: {
                path: 'user',
                select: '_id name image username email'
            }
        }).populate({
            path: 'comment',
            select: '_id user content',
            populate: {
                path: 'user',
                select: '_id name image username email'
            }
        }).lean()
        const total = await Report.find(query).count().lean()
        const pageCount = Math.ceil(total / perPage)
        return res.json({status:1 , items, pageCount, total})
    },
    async reportDelete (req,res) {
        const {_id} = req.body
        Report.findOneAndDelete({_id}, (err,doc) => err ? console.log(err) : null)
        return res.json({status:1, message: 'successfully_saved'})
    },
    async reportActionDelete (req,res) {
        const {_id, comment, blog} = req.body
        Report.findOneAndUpdate({_id},{status: 'solved'},{}, (err,doc) => err ? console.log(err) : null)
        if(comment){
            Comment.findOneAndDelete({_id: comment._id}, (err,doc) => err ? console.log(err) : null)
        }else {
            Blog.findOneAndDelete({_id: blog._id}, (err,doc) => err ? console.log(err) : null)
            Index.updated(`post/${blog.slug}/${blog.__id}`)
        }
        return res.json({status:1, message: 'successfully_saved'})
    },
    async reportActionBan (req,res) {
        const {_id, comment, blog} = req.body
        Report.findOneAndUpdate({_id},{status: 'solved'},{}, (err,doc) => err ? console.log(err) : null)
        const banRole = await Role.findOne({banned: true},{_id:1})
        if(comment){
            User.findOneAndUpdate({_id : comment.user._id},{role: banRole._id},{}, (err,doc) => err ? console.log(err) : null)
        }else {
            User.findOneAndUpdate({_id : blog.user._id},{role: banRole._id},{}, (err,doc) => err ? console.log(err) : null)
        }
        return res.json({status:1, message: 'successfully_saved'})
    },
}