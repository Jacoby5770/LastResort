const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/courses', require('./courses'))
router.use('/assignments', require('./assignments'))
router.use('/categories', require('./categories'))
router.use('/assignmentCats', require('./assignmentCats'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
