const router = require('express').Router()
const {Course} = require('../db/models')
module.exports = router
 router.get('/', async (req, res, next) => {
  try {
    console.log('getting the courses', req.body)
    const course = await Course.findAll({
    })
    res.json(course)
  } catch (err) {
    next(err)
  }
})