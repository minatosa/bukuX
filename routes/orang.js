/* router orang.js */

const express = require('express')
let router = express.Router()

let orangCtrl  = require('../controllers/orangCtrl')

router.post('/', orangCtrl.create)
router.get('/', orangCtrl.getAll)
router.get('/:id', orangCtrl.getOne)
router.put('/:id', orangCtrl.updateNama)
router.delete('/:id', orangCtrl.remove)

module.exports = router