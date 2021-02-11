const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')

const users = require('./routes/api/users')
const posts = require('./routes/api/posts')

const app = express()

//middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// db configuration
const MONGO_URI = process.env.MONGO_URI

app.use(express.static(path.join(__dirname)))
app.use(passport.initialize())
require('./middleware/passport')(passport)
app.use('/api/users/', users)
app.use('/api/posts/', posts)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`)

  mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Mongo Connection successful'))
    .catch((err) => console.log('err'))

  mongoose.set('useFindAndModify', false)
  mongoose.Promise = global.Promise
})
