const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router
.route('/')
.get(async (req, res, next) => {
  try {
    console.log('getting the users', req.body)
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
