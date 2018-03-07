/* models buku.js */

const mongoose = require('mongoose') // framework mongoose

var bukuSchema = mongoose.Schema({
    judul: String,
    id_orang : {
        type : mongoose.Schema.ObjectId,
        ref : 'OrangTest1'
    },
    list_peminjam :[ {
        type : mongoose.Schema.ObjectId,
        ref : 'OrangTest1'
    } ],
});

var Buku = mongoose.model('BukuTest1', bukuSchema);

module.exports = Buku;