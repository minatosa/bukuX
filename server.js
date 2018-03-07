require('dotenv').config()
const app = require('express')()
const bodyParser = require('body-parser')
const mongo_url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds044907.mlab.com:44907/dbexpress`
const cors = require('cors') // biar bisa diaksess localhost
const mongoose = require('mongoose') // framework mongoose

// panggil routing
let buku = require('./routes/buku') 
let orang = require('./routes/orang') 
let index = require('./routes/index') 


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/buku', buku)
app.use('/orang', orang)
app.use('/user', index)

app.get('/', function(err, res){
    res.send('Localhost : Alive')
})

mongoose.connect(mongo_url, function(err, res){
    if(err) console.log("hahah :" + err)
    else console.log('connected to mongoose')
    app.listen(3000)
})