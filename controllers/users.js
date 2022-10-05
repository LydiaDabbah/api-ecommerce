const connect = require("../database");


//CRUD users    

const getAllUsers = async (req, res) => {

  try {
    const dbResponse = await connect.query(`
        SELECT 
            u.user_id,
            u.first_name,
            u.last_name,
            u.email,
            u.birth_date,
            u.gender_id,
            g.gender,
            u.password,
            u.role_id,
            r.role_name
        FROM users as U
        RIGHT JOIN genders as G
        on g.gender_id=u.gender_id
        RIGHT JOIN roles as R
        on r.role_id=u.role_id
    `);

    res.status(200).send({
      data: dbResponse.rows,
    });
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
};


const getUser = async (req, res) => {
    const id = req.params.userid
  
    try {
        const dbResponse = await connect.query(`
            SELECT 
                u.user_id,
                u.first_name,
                u.last_name,
                u.email,
                u.birth_date,
                u.gender_id,
                g.gender,
                u.password,
                u.role_id,
                r.role_name
            FROM users as U
            RIGHT JOIN genders as G
            on g.gender_id=u.gender_id
            RIGHT JOIN roles as R
            on r.role_id=u.role_id
            WHERE u.user_id=$1`, [id])
  
        if (dbResponse.rowCount > 0) {
            res.status(200).send({
                data: dbResponse.rows
        })

        } else {
            res.status(404).send({
                message: 'Product not found'
        })
        }
  
        } catch (error) {
            res.status(404).send({
                error
            })
        }
};

const addUser = async (req, res) => {
    const { first_name, last_name, email, birth_date, gender_id,password,role_id} = req.body
  
    try {
      const dbResponse = await connect.query(
        `INSERT INTO users(first_name, last_name, email, birth_date, gender_id,password,role_id) 
        VALUES ($1, $2, $3, $4,$5,crypt($6, gen_salt('bf')),$7)`,
        [first_name, last_name, email, birth_date, gender_id,password,role_id]
      )
  
        if (dbResponse.rowCount > 0) {
        res.status(201).send({
          message: "User added"
        })

      } else {
        res.status(409).send({
          message: "Unable to add the user right now"
        })
      }

        } catch (error) {
        res.status(409).send({
            error
        })
        }
  }
  
  

const updateUser = async (req, res) => {
    const id = req.params.userid
    const { first_name, last_name, email, birth_date, gender_id,password,role_id } = req.body

    try {
        const dbResponse = await connect.query(`
        UPDATE users
          SET
            first_name=$1,
            last_name=$2,
            email=$3, 
            birth_date=$4, 
            gender_id=$5,
            password=$6,
            role_id=$7
        WHERE user_id = $8`,
          [first_name, last_name, email, birth_date, gender_id,password,role_id, id])
    
        if (dbResponse.rowCount > 0) {
          res.status(200).send({
            message: "User updated"
          })
        } else {
          res.status(409).send({
            message: "Unable to update the user right now"
          })
        }
    
      } catch (error) {
        res.status(400).send({
          error
        })
      }
};

const deleteUser = async (req, res) => {
    const id = req.params.userid

    try {
      const dbResponse = await connect.query(`DELETE FROM users WHERE user_id = $1`, [id])
  
      if (dbResponse.rowCount > 0) {
        res.status(200).send({
          message: "User deleted"
        })

      } else {
        res.status(409).send({
          message: "Unable to delete that user"
        })
      }
  
    } catch (error) {
      res.status(400).send({
        error
      })
    }
};

module.exports = {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser};