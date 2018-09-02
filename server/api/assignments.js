const router = require('express').Router()
const { Assignment, Category, CategoryLineItem } = require('../db/models')
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
      const assignment = await Assignment.create(req.body.newAssignment)

      const category = await Category.findById(req.body.categoryId)

      await assignment.addCategory(category)
      
      const assignmentCatItem = await CategoryLineItem.findOne({
        where: {
          assignmentId: assignment.id,
          categoryId: category.id
        }
      })
      res.json(assignment, assignmentCatItem)
    } catch (err) {
      err.status = 400
      err.message = { error: err.message }
      next(err)
    }
  })

