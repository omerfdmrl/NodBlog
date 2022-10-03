const express = require('express')
const router = express.Router();
const FeedController = require('../controllers/feed.controller')

router.get('/',(req,res) => {
    FeedController.index(req,res)
})

module.exports = router