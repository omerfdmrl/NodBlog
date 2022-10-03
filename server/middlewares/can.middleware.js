module.exports = (permission) => {
    return (req, res, next) => {
        if(!req.user){
            return res.status(301).json({status : 0, message : 'need_to_login', 'redirect' : 'panel-login'})
        }
        if(!permission){
            return next()
        }
        
        if(req.user.role.permission.includes(permission)){
            return next()
        }
        return res.status(301).json({status : 0, message : 'permission_denied'})
    }
}