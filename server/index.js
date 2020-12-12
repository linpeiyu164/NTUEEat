require('dotenv-defaults').config()

const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const Websocket = require('ws')
const functions = require('./core/functions')
const {calculateAverageRating } = functions

const storeRouter = require('./routes/stores')
const userRouter = require('./routes/users')

const Store = require('./model/Store')

const app = express();
const server = http.createServer(app)
const wss = new Websocket.Server({server})

//middleware
app.use(cors())
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

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

const db=mongoose.connection;
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
            store.comments.push(newComment)
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