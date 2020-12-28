const Service = require('../models').Service

exports.getAll = function(req, res) {
  Service.findAll().then(services => {
    res.status(200).json(services)
  })
}

exports.getByID = function(req, res) {
  const id = req.params.id

  Service.findByPk(id)
    .then(service => {
      res.status(200).json(service)
    })
    .catch(() => {
      res.status(500).json({
        message: 'Cannot find service.'
      })
    })
}

exports.create = function(req, res) {
  Service.create({
    name: req.body.name,
    owner: req.body.owner,
    description: req.body.description,
    active: req.body.active
  })
    .then(service => {
      res.status(200).json(service)
    })
    .catch(err => {
      res.status(500).json({
        message: 'Service cannot be created.',
        errors: err.errors
      })
    })
}

exports.update = function(req, res) {
  const id = req.params.id

  Service.update(
    {
      name: req.body.name,
      owner: req.body.owner,
      description: req.body.description,
      active: req.body.active
    },
    {
      where: { id: id }
    }
  )
    .then(result => {
      if (result[0] === 1) {
        return Service.findByPk(id)
      } else {
        res.status(500).json({
          message: 'Service cannot be updated.',
          body: req.body
        })
      }
    })
    .then(service => {
      res.status(200).json(service)
    })
    .catch(err => {
      res.status(500).json({
        message: 'Service cannot be updated.',
        errors: err.errors
      })
    })
}

exports.delete = function(req, res) {
  const id = req.params.id

  Service.destroy({
    where: { id: id }
  })
    .then(result => {
      if (result === 1) {
        res.status(200).json({
          message: 'Service deleted.'
        })
      } else {
        res.status(500).json({
          message: 'Service cannot be deleted.'
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Error deleting Service with id of ${id}.`
      })
    })
}
