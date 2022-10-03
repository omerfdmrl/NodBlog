const express = require('express')
const router = express.Router();
const SitemapController = require('../controllers/sitemap.controller')

router.get('/',(req,res) => {
    SitemapController.index(req,res)
})
router.get('/blog',(req,res) => {
    SitemapController.blog(req,res)
})
router.get('/user',(req,res) => {
    SitemapController.user(req,res)
})
router.get('/tag',(req,res) => {
    SitemapController.tag(req,res)
})

module.exports = router