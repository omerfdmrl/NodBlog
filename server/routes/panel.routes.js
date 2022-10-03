const express = require('express')
const router = express.Router();
const PanelController = require('../controllers/panel.controller')
const Can = require('../middlewares/can.middleware')

router.post('/blog-list',Can('panel-blog-list'),(req,res) => {
    PanelController.blogList(req,res)
})
router.post('/blog-add',Can('panel-blog-add'),(req,res) => {
    PanelController.blogAdd(req,res)
})
router.post('/blog-get-edit',Can('panel-blog-edit'),(req,res) => {
    PanelController.blogGetEdit(req,res)
})
router.post('/blog-save-edit',Can('panel-blog-save'),(req,res) => {
    PanelController.blogSaveEdit(req,res)
})
router.post('/blog-delete',Can('panel-blog-delete'),(req,res) => {
    PanelController.blogDelete(req,res)
})
router.post('/user-get-edit',Can('panel-user-edit'),(req,res) => {
    PanelController.userGetEdit(req,res)
})
router.post('/user-change-image',Can('panel-user-edit'),(req,res) => {
    PanelController.userChangeImage(req,res)
})
router.post('/user-save-edit',Can('panel-user-edit'),(req,res) => {
    PanelController.userSaveEdit(req,res)
})

module.exports = router