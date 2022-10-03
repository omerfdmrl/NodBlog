const express = require('express')
const router = express.Router();
const MainController = require('../controllers/main.controller')

router.post('/info',(req,res) => {
    MainController.info(req,res)
})
router.post('/tag-list',(req,res) => {
    MainController.tagList(req,res)
})

module.exports = router