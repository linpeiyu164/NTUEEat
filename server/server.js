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
        const { username, content, rating, storeId } = JSON.parse(data);
        try{
            let user = await User.find({ username : username }).populate('comments')
            let previousComment = null
            user.comments.forEach(comment => {
                if(comment.store === storeId){
                    previousComment = comment
                }
            })
            if(!previousComment){
                let store = await Store.find({ _id : storeId })
                const newComment = {
                    store : storeId,
                    storename : store.storename,
                    username : username,
                    content : content, 
                    rating : rating
                }
                await newComment.save()
                store.comments.push(newComment)
                await store.save()
                let newRating = calculateAverageRating(store)
                store.rating = newRating
                await store.save()
            }else{
                ws.send(JSON.stringify({ data : previousComment, 
                msg : "You've already reviewed this restaurant before"}))
            }
            // broadcasting comments to all users connected
            wss.clients.forEach(client => {
                client.send(JSON.stringify(store.comments))
            })
        }catch(error){
            ws.send(JSON.stringify({ msg : errror }))
        }
    })
})