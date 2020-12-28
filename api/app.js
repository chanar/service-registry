const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const serviceRouter = require('./routes/service')
const models = require('./models')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/service', serviceRouter)

//Sync Database
models.sequelize
  .sync()
  .then(function() {})
  .catch(function(err) {
    console.log(err)
  })

module.exports = app
