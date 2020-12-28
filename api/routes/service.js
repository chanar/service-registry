const express = require('express')
const router = express.Router()
const Service = require('../models').Service

// Require controller
const service_controller = require('../controllers/serviceController')

// Middleware
const checkIfHasID = (req, res, next) => {
  if (isNaN(req.params.id)) {
    res.status(500).json({
      message: 'Invalid service ID.'
    })
  } else {
    next()
  }
}

const checkIfServiceExists = (req, res, next) => {
  Service.count({ where: { id: req.params.id } }).then(count => {
    if (count != 0) {
      next()
    } else {
      res.status(500).json({
        message: 'Cannot find service.'
      })
    }
  })
}

// Routes
router.get('/', service_controller.getAll)
router.post('/', service_controller.create)
router.get(
  '/:id',
  [checkIfHasID, checkIfServiceExists],
  service_controller.getByID
)
router.put(
  '/:id',
  [checkIfHasID, checkIfServiceExists],
  service_controller.update
)
router.delete(
  '/:id',
  [checkIfHasID, checkIfServiceExists],
  service_controller.delete
)

module.exports = router
