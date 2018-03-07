/* router buku.js */

const express = require('express')
let router = express.Router()

let bukuCtrl  = require('../controllers/bukuCtrl')

router.post('/', bukuCtrl.create)
router.get('/', bukuCtrl.getAll)
router.put('/pinjam', bukuCtrl.pinjam)
router.put('/pengarang', bukuCtrl.pengarang)
router.get('/:id', bukuCtrl.getOne)
router.put('/:id', bukuCtrl.updateJudul)
router.delete('/:id', bukuCtrl.remove)

module.exports = router