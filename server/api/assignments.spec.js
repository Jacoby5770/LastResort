/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const {Assignment} = require('../db/models')

describe('Test Assignment routes', () => {
  describe('Get from /api/assignments', () => {
    const category = 'Quiz 1'
    const gradeWeight = 0.1
    const grade = 100
    
    beforeEach(() => {
      return Assignment.create({
        category,
        gradeWeight,
        grade
      })
    })

    it('GETs /api/assignments', async () => {
      const res = await request(app)
        .get('/api/assignments/')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].category).to.be.equal(category)
      expect(+res.body[0].gradeWeight).to.be.equal(gradeWeight)
      expect(+res.body[0].grade).to.be.equal(grade)
    })
  })

  describe('Get from /api/assignments/', () => {
    it('handles good POST requests to /api/assigments', async () => {
      const newAssignment = {
        category: "Final Exam",
        gradeWeight: 0.5,
        grade: 100
      }

      const res = await request(app)
        .post('/api/assignments')
        .send(newAssignment)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.category).to.be.equal("Final Exam")
      expect(+res.body.gradeWeight).to.be.equal(0.5)
      expect(+res.body.grade).to.be.equal(100)
    })
    it('handles BAD POST to /api/assignments', async () => {
      const badProduct = {}
      const res = await request(app)
        .post('/api/assignments')
        .send(badProduct)
        .expect(400)
      expect(res.body.error).to.contain('notNull')
    })

  }) // end describe('/api/products')
}) // end describe('Product routes')
