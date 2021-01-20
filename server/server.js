require('dotenv-defaults').config()

const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const functions = require('./core/functions')

const passport = require('passport')
const initialize = require('./passport-config')

const storeRouter = require('./routes/stores')
const userRouter = require('./routes/users')

const Store = require('./model/Store')
const User = require('./model/User')
const Comment = require('./model/Comment')

const app = express();
const server = http.createServer(app)

///////////

const path = require('path');
const port = process.env.PORT || 80;

//middleware
app.use(cors())
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(cookieParser('secret'))
app.use(passport.initialize()) // initialize passport
app.use(passport.session()) // uses persistent login sessions

app.use('/stores', storeRouter)
app.use('/users', userRouter)

///
app.use(express.static(path.join(__dirname, '../build')));
app.get('/ping', function (req, res) {
  return res.send('pong');
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

///////////
//initializing passport config
initialize(passport)

//database connection
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    auto_reconnect: true,
    useUnifiedTopology: true,
    poolSize: 10
});



server.listen(port, () => console.log(`listening on port ${port}`))

const db = mongoose.connection;
db.on('open', () => {
    console.log('database connected!!')
})

