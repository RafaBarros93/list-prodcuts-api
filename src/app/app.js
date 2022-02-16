const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const lista_controller = require('./controllers/lista.controller')

class App {
  constructor() {
    this.app = new express()
    this.middleware()
    this.routes()
  }

  routes() {
    this.app.use('/api', lista_controller)
  }

  middleware() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(morgan('tiny'))
  }
}

module.exports = new App().app
