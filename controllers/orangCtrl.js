// controller > orangCtrl.js
// fungsi yang bermain-main dengan model

let Orang = require('../models/orang')
let Buku = require('../models/buku')

const create = function (req, res) {
    let orang = new Orang(req.body)
    orang.save(function (err, save_orang) {
        if (err) {
            res.status(500)
            res.send({ err: err })
        } else {
            res.status(200)
            res.send(save_orang)
        }
    })
}

const updateNama = function (req, res) {
    let id = req.params.id
    let namaOrang = req.body.nama
    let idBuku = req.body.idBuku

    Orang.findById(id, function (err, orang) {
        if (err) {
            res.status(500)
            res.send({ err: err })
        } else {
            if (namaOrang !== "undefined" && idBuku !== "undefined") {
                
                orang.judul = namaOrang
                orang.id_buku = idBuku
                
                console.log(orang)

                orang.save(function (err, u_orang) {
                    if (err) {
                        res.status(500)
                        res.send({ err: err })
                    } else {
                        Buku.findById(idBuku, function(err, buku){
                            if (err) {
                                res.status(500)
                                res.send({ err: err })
                            } else {
                                buku.id_orang = id

                                console.log(buku)

                                buku.save(function(err, u_buku){
                                    if (err) {
                                        res.status(500)
                                        res.send({ err: err })
                                    } else {
                                        res.send(u_buku);
                                    }
                                })
                            }
                        })
                    }
                })
            }

        }
    })
}

const remove = function (req, res) {
    let id = req.params.id

    Orang.findById(id, function (err, orang) {
        if (err) res.send({ err: err })
        else {
            orang.remove(function (err, d_orang) {
                if (err) res.send({ err: err })
                else res.send(d_orang)
            })
        }
    })
}

const getAll = function (req, res) {
    Orang.find({}, function (err, orangs) {
        if (err) res.send({ err: err })
        else res.send(orangs)
    })
}

const getOne = function (req, res) {
    let id = req.params.id

    Orang.findById(id, function (err, orang) {
        if (err) res.send({ err: err })
        else res.send(orang)
    })
}

module.exports = {
    create,
    getAll,
    getOne,
    updateNama,
    remove
}