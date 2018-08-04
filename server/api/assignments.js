const router = require('express').Router()
const {Assignment} = require('../db/models')
module.exports = router

const createAssignmentFromJSON = body => ({
  category: '' + body.category,
  grade: +body.grade,
  
})

 router
 .route('/')
 .get(async (req, res, next) => {
  try {
    const assignment = await Assignment.findAll({
    })
    res.json(assignment)
  } catch (err) {
    next(err)
  }
})
.post(async (req, res, next) => {
  try {
    const assignment = await Assignment.create(createAssignmentFromJSON(req.body))
    res.json(assignment)
  } catch (err) {
    err.status = 400
    err.message = {error: err.message}
    next(err)
  }
})

