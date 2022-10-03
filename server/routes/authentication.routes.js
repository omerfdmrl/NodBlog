const express = require('express')
const router = express.Router();
const Can = require('../middlewares/can.middleware')
const AuthenticationController = require('../controllers/authentication.controller')

router.post('/login',(req,res) => {
    AuthenticationController.login(req,res)
})
router.post('/register',(req,res) => {
    AuthenticationController.register(req,res)
})
router.post('/logout',(req,res) => {
    AuthenticationController.logout(req,res)
})
router.post('/send-forgot-password',(req,res) => {
    AuthenticationController.sendForgotPassword(req,res)
})
router.post('/submit-forgot-password',(req,res) => {
    AuthenticationController.submitForgotPassword(req,res)
})

module.exports = router