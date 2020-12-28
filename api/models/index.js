const Sequelize = require('sequelize')
const config = require('../database/config.json')
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)
const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

db.Service = require('./service.model')(sequelize, Sequelize)

module.exports = db
