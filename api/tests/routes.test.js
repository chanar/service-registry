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

describe('Service API', () => {
  it('should validate on creation', async () => {
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

  it('should validate on update', async () => {
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

  it('should update a service', async () => {
    payload.name = 'Test service updated'
    payload.active = false

    const res = await request(app)
      .put('/api/service/1')
      .send(payload)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject(payload)
  })

  it('should be able to update values separately', async () => {
    const res = await request(app)
      .put('/api/service/1')
      .send({
        active: true
      })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({
      active: true
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
