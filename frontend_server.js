const express = require('express');
const mongoose = require('mongoose')

const path = require('path');
const port = process.env.PORT || 80;
const app = express();

mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser: true,
  useCreateIndex: true,
  auto_reconnect: true,
  useUnifiedTopology: true,
  poolSize: 10
});

app.use(express.static(path.join(__dirname, 'build')));

const bodyParser = require('body-parser')

app.use(bodyParser.json());

app.use('/stores', storeRouter)
app.use('/users', userRouter)

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);
console.log("Server Ready!")