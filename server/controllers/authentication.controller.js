const Validator = require('../services/validator.service')
const User = require('../models/user.model')
const Role = require('../models/role.model')
const Bcrypt = require('bcrypt')
const Logger = require('../services/logger.service')
const Notification = require('../services/notification.service')
const Crypto = require('crypto')

module.exports = {
    async login (req,res) {
        const {email, password, remember, panel} = req.body
        if(!Validator.isEmail(email)){
            return res.json({status: 0, message: 'email_required'})
        }
        if(!Validator.isStrong(password)){
            return res.json({status: 0, message: 'wrong_password'})
        }
        const user = await User.findOne({email}).populate('role')
        if(!user){
            return res.json({status : 0, message : "email_not_exists"})
        }
        const compare = await Bcrypt.compare(password,user.password)
        if(!compare){
            if(user.notification.email.failed_login_attempt && user.notification.email.status){
                const parsedUa = parser.UAParser(req.headers['user-agent'])
                Notification.sendMail({ type : 'failed-login-attempt', subject : 'Failed Login Attempt', to : user.email, data : {
                    name : user.name.first + ' ' + user.name.last,
                    ip : req.ip,
                    browser : parsedUa.browser.name,
                    engine : parsedUa.engine.name,
                    os : parsedUa.os.name
                } })
            }
            return res.json({status : 0, message : "wrong_password"})
        }
        if(!user.role.permission.includes('login-site')){
            return res.json({status : 0, message : 'permission_denied'})
        }
        req.session.user = user._id
        Logger.user(user).info('Login')
        const userData = {
            name: user.name,
            image: user.image,
            email: user.email,
            can: {
                settings : false
            }
        }
        res.json({status : 1, message : "successfully_login", redirect: panel ? "panel-dashboard" : false, user: userData})
    },

    async register (req,res) {
        const {firstname, lastname, email, password, repassword, username, panel} = req.body
        if(Validator.isEmpty(firstname)){
            return res.json({status: 0, message: 'firstname_required'})
        }
        if(Validator.isEmpty(lastname)){
            return res.json({status: 0, message: 'lastname_required'})
        }
        if(!Validator.isEmail(email)){
            return res.json({status: 0, message: 'email_required'})
        }
        if(!Validator.isStrong(password)){
            return res.json({status: 0, message: 'password_is_not_strong_enough'})
        }
        if(!Validator.isEqual([password, repassword])){
            return res.json({status: 0, message: 'password_and_repassword_should_match'})
        }
        const user = await User.findOne({email})
        if(user){
            return res.json({status : 0, message : "email_is_already_exists"})
        }
        if(Validator.isEmpty(username)){
            return res.json({status:0, message: 'username_required'})
        }
        if(username.length < 4){
            return res.json({status:0, message: 'username_must_be_min_4_character'})
        }
        const check = await User.findOne({username},{_id:1})
        if(check){
            return res.json({status:0, message: 'username_already_exists'})
        }
        const defaultRole = await Role.findOne({default : true})
        if(!defaultRole.permission.includes('register-site')){
            return res.json({status : 0, message : 'permission_denied'})
        }
        const insert = await new User({name: {first: firstname, last: lastname},email,password,role : defaultRole._id, username}).save()
        Logger.user({_id: insert._id}).info('Register')
        res.json({status : 1, message : panel ? "successfully_register" : false, redirect: "panel-login"})
    },

    async logout (req,res) {
        const {redirect} = req.body
        if(!req.session.loginAs){
            Logger.user(req.user).info('Logout')
            req.session.user = null
            return res.json({status : 1, message : "successfully_logout", redirect: redirect ? "panel-login" : false})
        }else {
            req.session.user = req.session.loginAs
            req.session.loginAs = null
            return res.json({status : 1, redirect: 'panel-dashboard', refresh: true})
        }
    },

    async sendForgotPassword(req,res) {
        const {email} = req.body
        if(!Validator.isEmail(email)){
            return res.json({status : 0, message : 'email_required'})
        }
        const user = await User.findOne({ email }).lean()
        if(user){
            if(Validator.timeDiff(user.forgot_password.send,'hours') < 1){
                return res.json({status : 0, message : 'forgot_password_mail_already_sended'})
            }
            const code = Crypto.randomBytes(32).toString('hex')
            User.findOneAndUpdate({_id : user._id},{ 'forgot_password.send' : new Date(),'forgot_password.code' : code },{}, (err,doc) => err ? console.log(err) : null)
            Notification.sendMail({ type : 'forgot-password', subject : 'Forgot Password', to : user.email, data : {
                name : user.name.first + ' ' + user.name.last,
                code : code,
                email : user.email
            } })
            Logger.user(user).info('Forgot Password Mail Sended')
        }
        res.json({status : 1, message : 'successfully_forgot_password_mail_sended'})
    },

    async submitForgotPassword(req,res) {
        const {code,email,password,repassword} = req.body
        if(Validator.isEmpty(password)){
            return res.json({status : 0, message : "password_required"})
        }
        if(!Validator.isStrong(password)){
            return res.json({status: 0, message: 'password_is_not_strong_enough'})
        }
        if(!Validator.isEqual([password, repassword])){
            return res.json({status: 0, message: 'password_and_repassword_should_match'})
        }
        const user = await User.findOne({ email: email , 'forgot_password.code' : code }).lean()
        if(user){
            const hashedPassword = await Bcrypt.hash(password,10)
            User.findOneAndUpdate({_id : user._id},{ 'forgot_password.send' : null,'forgot_password.code' : null,'forgot_password.at' : new Date(), password : hashedPassword },{}, (err,doc) => err ? console.log(err) : null)
            return res.json({ status : 1 , redirect : 'panel-login' , message : 'successfully_password_changed'})
        }
        res.json({ status : 0 , redirect : 'panel-login' , message : 'unsuccessfully_password_changed'})
        Logger.user(user).info('Password Changed')
    },
}