require('dotenv-defaults').config()

const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const Websocket = require('ws')
const cookieParser = require('cookie-parser')
const functions = require('./core/functions')
const {calculateAverageRating} = functions

const passport = require('passport')
const initialize = require('./passport-config')

const storeRouter = require('./routes/stores')
const userRouter = require('./routes/users')

const Store = require('./model/Store')
const User = require('./model/User')

const app = express();
const server = http.createServer(app)
const wss = new Websocket.Server({server})

//initializing passport config
initialize(passport)

//middleware
app.use(cors())
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(cookieParser('secret'))
app.use(passport.initialize()) // initialize passport
app.use(passport.session()) // uses persistent login sessions

app.use('/stores', storeRouter)
app.use('/users', userRouter)


const port = process.env.PORT || 4000
server.listen(port, () => console.log(`listening on port ${port}`))


//database connection
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    auto_reconnect: true,
    useUnifiedTopology: true,
    poolSize: 10
});

const db = mongoose.connection;
db.on('open', () => {
    console.log('database connected!')
})

// websockets for comments
wss.on('connection', ws => {
    ws.on('message', async (data) => {
        const {username, content, rating, storeId} = data;
        try{
            let store = await Store.find({ _id : storeId })
            const newComment = {
                username : username, 
                content : content, 
                rating : rating
            }
            let exists = false;
            store.comments.forEach(comment => {
                if(comment.username === username){
                    comment = {
                        username : newComment.username,
                        content : newComment.content,
                        rating : newComment.rating
                    }
                    exists = true;
                }
            })
            if(!exists){
                store.comments.push(newComment)
            }
            await store.save()

            // new rating --> not real-time, only comments are real-time
            let newRating = calculateAverageRating(store)
            store.rating = newRating
            await store.save()

            // broadcasting comments to all users connected
            wss.clients.forEach( client => {
                client.send(JSON.stringify(store.comments))
            })

        }catch(err){
            ws.send(JSON.stringify({msg : err}))
        }
    })
})