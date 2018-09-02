const router = require('express').Router()
const {CategoryLineItem} = require('../db/models')
module.exports = router

// const createAssCatItemFromJSON = body => ({
//   assignmentId: +body.assignmentId,
//   catogoryId: +body.catogoryId,
// })

router.get('/', async (req, res, next) => {
  try {
    const assignmentCats = await CategoryLineItem.findAll({})
    res.json(assignmentCats)
  } catch (err) {
    next(err)
  }
})
