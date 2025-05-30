const joi = require('@hapi/joi')

const rotaUsuarios = '/usuarios'
const schema = require('./schema')

describe(rotaUsuarios + ' CONTRATO - @smokeE2E', () => {
  it('GET', async () => {
    const { body } = await request.get(rotaUsuarios).expect(200)
    joi.assert(body, schema.get)
  })

  it('GET One', async () => {
    const { body } = await request.get(`${rotaUsuarios}/0uxuPY0cbmQhpEz1`).expect(200)
    joi.assert(body, schema.getOne)
  })

  it('POST', async () => {
    const { body } = await request
      .post(rotaUsuarios)
      .send({})
      .expect(400)

    joi.assert(body, schema.post)
  })

  it('PUT', async () => {
    const { body } = await request
      .put(`${rotaUsuarios}/123123123`)
      .send({})
      .expect(400)

    joi.assert(body, schema.put)
  })
})
