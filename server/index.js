require('dotenv-defaults').config()

const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
// const Websocket = require('ws')

const storeRouter = require('./routes/stores')
const userRouter = require('./routes/users')
const app = express();
// const wss = new Websocket.Server({server})

//middleware
app.use(cors())
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

app.use('/stores', storeRouter)
app.use('/users', userRouter)

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