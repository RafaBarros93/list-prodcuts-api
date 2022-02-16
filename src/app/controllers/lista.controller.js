const express = require('express')
const router = express.Router()
const ListaHandlers = require('../handlers/lista.hanlders')

router.get('/', (req, res) => {
  res.json({Api: 'Api produtos'})
})

router.get('/listas', async (req, res) => {
  const lista = await ListaHandlers.getItens()

  res.json(lista)
})

router.post('/listas', async (req, res) => {
  try {
    let lista = await ListaHandlers.addItens(req.body)

    console.log('Lista', lista)

    res.statusCode = 201
    res.json(lista)
  } catch (error) {
    res.statusCode = 400
    throw res.json(error)
  }
})
router.delete('/listas/:id', async (req, res) => {
  try {
    let {id} = req.params

    let lista = await ListaHandlers.delete(id)

    res.json(lista)
  } catch (error) {
    console.log('EEROU::', error)
    if (error.message === 'Item não encontrado!') {
      res.statusCode = 404
      throw res.json(error)
    } else {
      res.statusCode = 500
    }
  }
})

module.exports = router
