// Delete database before each test run
const fs = require('fs')
fs.unlink('./database/database.db', err => {
  if (err) {
    console.error(err)
    return
  }
})

const request = require('supertest')
const app = require('../app.js')

let payload = {
  name: 'Test service',
  owner: 'Admin',
  description: 'Node test description',
  active: true
}

let payloadUpdate = {
  name: 'Test service Updated',
  owner: 'Admin2',
  description: 'Node test description updated',
  active: false
}

describe('Service API', () => {
  it('should validate empty fields on creation', async () => {
    const res = await request(app)
      .post('/api/service')
      .send({})

    expect(res.statusCode).toEqual(500)
    expect(res.body).toMatchObject({
      message: 'Service cannot be created.',
      errors: [
        {
          message: 'Service name is required.'
        },
        {
          message: 'Service owner is required.'
        },
        {
          message: 'Service description is required.'
        }
      ]
    })
  })

  it('should create a service', async () => {
    const res = await request(app)
      .post('/api/service')
      .send(payload)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject(payload)
  })

  it('should return error on duplicate service name', async () => {
    const res = await request(app)
      .post('/api/service')
      .send(payload)

    expect(res.statusCode).toEqual(500)
    expect(res.body).toMatchObject({
      message: 'Service cannot be created.',
      errors: [
        {
          message: 'Service name already in use.'
        }
      ]
    })
  })

  it('should show all services', async () => {
    const res = await request(app).get('/api/service')
    expect(res.statusCode).toEqual(200)
    expect(res.body[0]).toMatchObject(payload)
  })

  it('should get a service', async () => {
    const res = await request(app).get('/api/service/1')

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject(payload)
  })

  it('should validate empty fields on update', async () => {
    const res = await request(app)
      .put('/api/service/1')
      .send({
        name: '',
        owner: '',
        description: ''
      })

    expect(res.statusCode).toEqual(500)
    expect(res.body).toMatchObject({
      message: 'Service cannot be updated.',
      errors: [
        {
          message: 'Service name is required.'
        },
        {
          message: 'Service owner is required.'
        },
        {
          message: 'Service description is required.'
        }
      ]
    })
  })

  it('should allow only boolean value for field "active"', async () => {
    const res = await request(app)
      .put('/api/service/1')
      .send({
        active: 'Not a boolean'
      })

    expect(res.statusCode).toEqual(500)
    expect(res.body).toMatchObject({
      message: 'Service cannot be updated.',
      errors: [
        {
          message: 'Status accepts only boolean values.'
        }
      ]
    })
  })

  it('should update a service', async () => {
    payload.name = 'Test service updated'

    const res = await request(app)
      .put('/api/service/1')
      .send(payload)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject(payload)
  })

  Object.keys(payloadUpdate).forEach(function(key) {
    let testObj = new Object()
    it(`should be able to update ${key} separately`, async () => {
      testObj[key] = payloadUpdate[key]

      const res = await request(app)
        .put('/api/service/1')
        .send(testObj)

      expect(res.statusCode).toEqual(200)
      expect(res.body).toMatchObject(testObj)
    })
  })

  it('should delete a service', async () => {
    payload.name = 'Test service updated'
    payload.active = false

    const res = await request(app).delete('/api/service/1')

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({
      message: 'Service deleted.'
    })
  })

  it('should not find a service', async () => {
    const res = await request(app).get('/api/service/1')

    expect(res.statusCode).toEqual(500)
    expect(res.body).toMatchObject({
      message: 'Cannot find service.'
    })
  })

  it('should reject inavlid id', async () => {
    const res = await request(app).delete('/api/service/asd')

    expect(res.statusCode).toEqual(500)
    expect(res.body).toMatchObject({
      message: 'Invalid service ID.'
    })
  })
})
