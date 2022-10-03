const express = require('express')
const router = express.Router();
const SiteController = require('../controllers/site.controller')
const Can = require('../middlewares/can.middleware')

router.post('/home',(req,res) => {
    SiteController.home(req,res)
})
router.post('/home-blog',(req,res) => {
    SiteController.homeBlog(req,res)
})
router.post('/home-popular',(req,res) => {
    SiteController.homePopular(req,res)
})
router.post('/blog-index',(req,res) => {
    SiteController.blogIndex(req,res)
})
router.post('/blog-like',Can('site-blog-like'),(req,res) => {
    SiteController.blogLike(req,res)
})
router.post('/blog-report',Can('site-blog-report'),(req,res) => {
    SiteController.blogReport(req,res)
})
router.post('/blog-dislike',Can('site-blog-dislike'),(req,res) => {
    SiteController.blogDislike(req,res)
})
router.post('/comment-add',Can('site-comment-add'),(req,res) => {
    SiteController.commentAdd(req,res)
})
router.post('/comment-like',Can('site-comment-like'),(req,res) => {
    SiteController.commentLike(req,res)
})
router.post('/comment-report',Can('site-comment-report'),(req,res) => {
    SiteController.commentReport(req,res)
})
router.post('/profile',(req,res) => {
    SiteController.profile(req,res)
})
router.post('/profile-blog',(req,res) => {
    SiteController.profileBlog(req,res)
})
router.post('/profile-follow',Can('site-profile-follow'),(req,res) => {
    SiteController.profileFollow(req,res)
})
router.post('/tag-index',(req,res) => {
    SiteController.tagIndex(req,res)
})
router.post('/tag-blog',(req,res) => {
    SiteController.tagBlog(req,res)
})
router.post('/search',(req,res) => {
    SiteController.search(req,res)
})

module.exports = router