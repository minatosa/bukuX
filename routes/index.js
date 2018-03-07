/* router orang.js */

const express = require('express')
let router = express.Router()

let orangCtrl  = require('../controllers/orangCtrl')

router.post('/login', orangCtrl.login)
router.post('/register', orangCtrl.insert)

module.exports = router