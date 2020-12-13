require('dotenv-defaults').config()

const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
// const Websocket = require('ws')

const router = require('./routes/stores')
const multer = require('multer')
const app = express();
// const wss = new Websocket.Server({server})

//middleware
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())

app.use('/stores', router)

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`listening on port ${port}`))
// wss.on('connection', () => console.log(`websocket connected on port ${port}`))

//database connection
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    auto_reconnect: true,
    useUnifiedTopology: true,
    poolSize: 10
});

const db=mongoose.connection;
db.on('open', () => console.log('database connected'))