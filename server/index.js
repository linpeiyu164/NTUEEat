require('dotenv-defaults').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const wss = require('websocket')
const storerouter = require('./routes/stores')
const app = express();

//middleware
app.use(express.json())
app.use(cors())
app.use('/stores', storerouter)
app.use('/user')

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`listening on port ${port}`))

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