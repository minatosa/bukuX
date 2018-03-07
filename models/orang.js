/* models orang.js */

const mongoose = require('mongoose') // framework mongoose

var orangSchema = mongoose.Schema({
    nama: String,
    id_buku : {
        type : mongoose.Schema.ObjectId,
        ref : 'BukuTest1'
    }
});

var Orang = mongoose.model('OrangTest1', orangSchema);

module.exports = Orang