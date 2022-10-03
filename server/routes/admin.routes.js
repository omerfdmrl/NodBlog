const express = require('express')
const router = express.Router();
const AdminController = require('../controllers/admin.controller')
const Can = require('../middlewares/can.middleware')

router.post('/get-settings',Can('admin-get-settings'),(req,res) => {
    AdminController.getSettings(req,res)
})
router.post('/change-image',Can('admin-save-settings'),(req,res) => {
    AdminController.changeImage(req,res)
})
router.post('/save-settings',Can('admin-save-settings'),(req,res) => {
    AdminController.saveSettings(req,res)
})
router.post('/menu-list',Can('admin-get-menu'),(req,res) => {
    AdminController.menuList(req,res)
})
router.post('/menu-add',Can('admin-save-menu'),(req,res) => {
    AdminController.menuAdd(req,res)
})
router.post('/menu-delete',Can('admin-save-menu'),(req,res) => {
    AdminController.menuDelete(req,res)
})
router.post('/menu-save',Can('admin-save-menu'),(req,res) => {
    AdminController.menuSave(req,res)
})
router.post('/user-list',Can('admin-get-user'),(req,res) => {
    AdminController.userList(req,res)
})
router.post('/user-save',Can('admin-save-user'),(req,res) => {
    AdminController.userSave(req,res)
})
router.post('/user-login-as',Can('admin-login-as'),(req,res) => {
    AdminController.userLoginAs(req,res)
})
router.post('/user-change-image',Can('admin-save-user'),(req,res) => {
    AdminController.userChangeImage(req,res)
})
router.post('/group-list',Can('admin-get-group'),(req,res) => {
    AdminController.groupList(req,res)
})
router.post('/group-add',Can('admin-save-group'),(req,res) => {
    AdminController.groupAdd(req,res)
})
router.post('/group-save',Can('admin-save-group'),(req,res) => {
    AdminController.groupSave(req,res)
})
router.post('/group-delete',Can('admin-save-group'),(req,res) => {
    AdminController.groupDelete(req,res)
})
router.post('/role-list',Can('admin-get-role'),(req,res) => {
    AdminController.roleList(req,res)
})
router.post('/role-add',Can('admin-save-role'),(req,res) => {
    AdminController.roleAdd(req,res)
})
router.post('/role-save',Can('admin-save-role'),(req,res) => {
    AdminController.roleSave(req,res)
})
router.post('/permission-list',Can('admin-get-role'),(req,res) => {
    AdminController.permissionList(req,res)
})
router.post('/report-list',Can('admin-get-report'),(req,res) => {
    AdminController.reportList(req,res)
})
router.post('/report-delete',Can('admin-save-report'),(req,res) => {
    AdminController.reportDelete(req,res)
})
router.post('/report-action-delete',Can('admin-save-report'),(req,res) => {
    AdminController.reportActionDelete(req,res)
})
router.post('/report-action-ban',Can('admin-save-report'),(req,res) => {
    AdminController.reportActionBan(req,res)
})

module.exports = router