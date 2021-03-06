const bodyParser = require('body-parser')
const helmet = require('helmet')
const express = require('express')

const routes = require('../routes/')

const configureExpress = () => {
  const app = express()

  app.set('port', process.env.PORT || '3000')

  app.use(helmet())
  app.use(helmet.noCache())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  app.use((req, res, next) => {
    delete req.body.id
    delete req.body.created_at
    delete req.body.updated_at
    delete req.body.deleted_at
    next()
  })

  app.use('/api', routes)

  app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  app.use((err, req, res, next) => { // eslint-disable-line max-params, no-unused-vars
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    res.status(err.status || 500)
    res.send(res.locals.error)
  })

  return app
}

module.exports = {
  configureExpress,
}
