
const connect = require("../database");
const { createToken } = require('../utils')

const loginController= async(req,res)=>{
    const { email, password } = req.body

    try {
      const dbResponse = await connect.query(
        "SELECT * FROM users WHERE email = $1 AND password = crypt($2, password)",//que compare con crypt que la password de la data bd y la del body sean iguales
        [email, password]
      )
  
      if (dbResponse.rowCount > 0) {
        const data = {
          id: dbResponse.rows[0].user_id,
          email: dbResponse.rows[0].email,
          first_name:  dbResponse.rows[0].first_name,
          last_name:  dbResponse.rows[0].last_name,
          role_id: dbResponse.rows[0].role_id
        }
  
        const token = createToken(data)
      

        res.status(200).send({
          data: token
        })
      } else {
        res.status(404).send({
          message: "Usuario o contraseña incorrectos."
        })
      }
    } catch (error) {
      res.status(404).send({
        error
      })
    }
}

module.exports={loginController};