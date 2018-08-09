const router = require('express').Router()
const {CategoryLineItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const assignmentCats = await CategoryLineItem.findAll({})
    res.json(assignmentCats)
  } catch (err) {
    next(err)
  }
})