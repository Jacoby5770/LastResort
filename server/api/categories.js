const router = require('express').Router()
const {Category} = require('../db/models')
module.exports = router

const createCategoryFromJSON = body => ({
    category: '' + body.category,
    gradeWeight: +body.gradeWeight,
    totalQuantity: +body.totalQuantity
  })

router
.route('/')
.get(async (req, res, next) => {
  try {
    const category = await Category.findAll({
    })
    res.json(category)
  } catch (err) {
    next(err)
  }
})
.post(async (req, res, next) => {
    try {
      const category = await Category.create(createCategoryFromJSON(req.body))
      res.json(category)
    } catch (err) {
      err.status = 400
      err.message = {error: err.message}
      next(err)
    }
  })