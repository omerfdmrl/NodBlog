const User = require('../models/user.model')
const Setting = require('../models/settings.model')
module.exports = async (req,res,next) => {
    if(req.session.user){
        const user = await User.findOne({_id : req.session.user}).populate('role')
        req.user = user
    }
    const settings = await Setting.findOne()
    req.settings = settings
    next()
}