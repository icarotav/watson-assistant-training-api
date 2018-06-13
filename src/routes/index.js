const express = require('express')
const assistantRoutes = require('./watson-assistant')

const router = express.Router()

router.use('/message', assistantRoutes)

router.get('/', (req, res, next) => {
  res.send({ index: 'index route' })
})

module.exports = router
