const router = require('express').Router()
const {Course} = require('../db/models')
module.exports = router

const createCourseFromJSON = body => ({
  name: '' + body.name,
  goalGPA: +body.goalGPA,
})

 router
 .route('/')
 .get(async (req, res, next) => {
  try {
    console.log('**************getting the courses', req.body)
    const course = await Course.findAll({
    })
    res.json(course)
  } catch (err) {
    next(err)
  }
})
.post(async (req, res, next) => {
  try {
    console.log('***********posting course', req.body)
    const course = await Course.create(createCourseFromJSON(req.body))
    res.json(course)
  } catch (err) {
    err.status = 400
    err.message = {error: err.message}
    next(err)
  }
})

