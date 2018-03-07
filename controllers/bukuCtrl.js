// controller > bukuCtrl.js
// fungsi yang bermain-main dengan model

let Buku = require('../models/buku')
let Orang = require('../models/orang') 

const create = function (req, res) {
    let buku = new Buku(req.body)
    buku.save(function (err, save_buku) {
        if (err) {
            res.status(500)
            res.send({ err: err })
        } else {
            res.status(200)
            res.send(save_buku)
        }
    })
}

const updateJudul = function (req, res) {
    let id = req.params.id
    let judulBuku = req.body.judul

    Buku.findById(id, function (err, buku) {
        if (err) {
            res.status(500)
            res.send({ err: err })
        } else {
            if (judulBuku !== "undefined") {
                buku.judul = judulBuku

                console.log(buku)

                buku.save(function (err, u_buku) {
                    if (err) {
                        res.status(500)
                        res.send({ err: err })
                    } else {
                        res.status(200)
                        res.send(u_buku)
                    }
                })
            }

        }
    })
}

const remove = function (req, res) {
    let id = req.params.id

    Buku.findById(id, function (err, buku) {
        if (err) res.send({ err: err })
        else {
            buku.remove(function (err, d_buku) {
                if (err) res.send({ err: err })
                else res.send(d_buku)
            })
        }
    })
}

const getAll = function (req, res) {
    Buku.find({})
    .populate('id_orang list_peminjam')
    .exec(function(err, bukus){
        if (err) res.send({ err: err })
        else res.send(bukus)
    })
}

const getOne = function (req, res) {
    let id = req.params.id

    Buku.findById(id, function (err, buku) {
        if (err) res.send({ err: err })
        else res.send(buku)
    })
}

const pinjam = function (req, res) {
    let id = req.body.idBuku
    let idOrang = req.body.idOrang

    Buku.findById(id, function (err, buku) {
        if (err) {
            res.status(500)
            res.send({ err: err })
        } else {
            if (idOrang !== "undefined") {
                buku.list_peminjam.push(idOrang);

                console.log(buku)

                buku.save(function (err, u_buku) {
                    if (err) {
                        res.status(500)
                        res.send({ err: err })
                    } else {
                        res.send(u_buku)
                    }
                })
            }else{
                res.send("undefined")
            }
        }
    })
}

const pengarang = function (req, res) {
    let id = req.body.idBuku
    let idOrang = req.body.idOrang

    Buku.findById(id, function (err, buku) {
        if (err) {
            res.status(500)
            res.send({ err: err })
        } else {
            if (idOrang !== "undefined") {
                buku.id_orang = idOrang;

                console.log(buku)

                buku.save(function (err, u_buku) {
                    if (err) {
                        res.status(500)
                        res.send({ err: err })
                    } else {
                        res.send(u_buku)
                    }
                })
            } else {
                res.send("undefined")
            }
        }
    })
}

module.exports = {
    create,
    getAll,
    getOne,
    updateJudul,
    remove,
    pinjam,
    pengarang
}