// controller > orangCtrl.js
// fungsi yang bermain-main dengan model

let Orang = require('../models/orang')
let Buku = require('../models/buku')
let Auth = require('../helpers/auth')

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
    let pass = req.body.pass

    Orang.findById(id, function (err, orang) {
        if (err) {
            res.status(500)
            res.send({ err: err })
        } else {
            if (namaOrang !== "undefined" && idBuku !== "undefined") {
                
                orang.nama = namaOrang
                orang.id_buku = idBuku
                orang.pass = Auth.hashPassword(pass)
                
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

    let token = req.headers.token;

    let user_data = Auth.getUserDetail(token)
    if(user_data){
        if(user_data.userID === "5a9f909695683a46687b3323" ){
            Orang.find({}, function (err, orangs) {
                if (err) res.send({ err: err })
                else res.send(orangs)
            })
        }else{
            res.send(user_data.userID)
        }
    }else{
        res.send({err : 'Invalid Token'})
    }

    
}

const getOne = function (req, res) {
    let id = req.params.id

    Orang.findById(id, function (err, orang) {
        if (err) res.send({ err: err })
        else res.send(orang)
    })
}

const login = function (req, res) {
    let nama = req.body.nama
    let pass = req.body.pass
    
    Orang.findOne({nama:nama}, function(err, data){
        // res.send(data + data.pass)
        let is_login = Auth.checkPassword(pass, data.pass)

        // res.send(is_login);

        if(is_login){
            
            let userData = {
                nama : data.nama,
                userID : data._id
            }
            // res.send(userData)
            let token = Auth.createToken(userData)
            if(token){
                res.send({token:token});
            }else{
                res.send("Token gagal");
            }
        }else{
            res.send("error invalid login");
        }
    })
}

const insert = function (req, res) {

    let hassPass = Auth.hashPassword(req.body.pass)

    let orang = new Orang({
        nama : req.body.nama,
        pass : hassPass
    })

    orang.save( function (err, orang){
        res.send(orang);
    })
}

module.exports = {
    create,
    getAll,
    getOne,
    updateNama,
    remove,
    insert,
    login
}