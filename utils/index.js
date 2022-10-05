const jtw = require('jsonwebtoken')

const createToken = (data)=>{
  const token = jtw.sign(data, 'secret', {expiresIn: '1d'}) // llave privada: secret es la palabra que quieras que sea secreto
  return token
}

module.exports = {
  createToken
}