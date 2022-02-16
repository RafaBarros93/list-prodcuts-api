const fs = require('fs-extra')
const {v4: uuidv4} = require('uuid')

class Lista {
  async getItens() {
    let lista = fs.readFileSync('src/app/handlers/lista.json')
    lista = JSON.parse(lista)

    let {
      lista: {itens},
    } = lista

    return itens
  }

  async addItens(item) {
    let lista = fs.readFileSync('src/app/handlers/lista.json')
    lista = JSON.parse(lista)

    let {
      lista: {itens},
    } = lista

    try {
      if (item.nome === '') throw {error: 'Campo Obrigátorio!'}
      if (item.quantidade === '') throw {error: 'Campo Obrigátorio!'}

      item.id = uuidv4()

      itens.push(item)

      this.writrFile(lista)

      return itens
    } catch (error) {
      console.log(error)
    }
  }

  async delete(id) {
    let jsonFile = fs.readFileSync('src/app/handlers/lista.json')
    console.log(id)
    try {
      jsonFile = JSON.parse(jsonFile)

      console.log(jsonFile)

      let is_exist_iten_list = jsonFile.lista.itens.find(iten => iten.id === id)

      if (!is_exist_iten_list) throw {message: 'Item não encontrado!'}

      jsonFile.lista.itens = jsonFile.lista.itens.filter(iten => iten.id != id)

      this.writrFile(jsonFile)

      return {id, message: `ID ${id} Apagado com sucesso!`}
    } catch (error) {
      throw error
    }
  }
  async writrFile(lista) {
    lista = JSON.stringify(lista)

    fs.writeFileSync('src/app/handlers/lista.json', lista, 'utf-8')
    console.log('JSON data is saved.')
  }
}

module.exports = new Lista()
