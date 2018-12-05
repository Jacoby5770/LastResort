const router = require('express').Router()
module.exports = router

 router
 .route('/')
 .get(async (req, res, next) => {
  try {
      fetch('http://3.17.52.242/get-grades?username=kangj4&password=Westbrook00!').then(function(response) {
        res.json(response)
      })
  } catch (err) {
    next(err)
  }
})

