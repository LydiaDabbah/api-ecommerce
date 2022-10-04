const connect = require("../database");

//CRUD users    

const getAllUsers = async (req, res) => {

  try {
    const dbResponse = await connect.query(`
        SELECT 
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
    const id = req.params.productid
    const { product_name, description, brand_id, category_id,price,sku,image,status,stock } = req.body

    try {
        const dbResponse = await connect.query(`
        UPDATE products
          SET
            product_name=$1,
            description=$2, 
            brand_id=$3,
            category_id=$4,
            price=$5,
            sku=$6,
            image=$7,
            status=$8,
            stock=$9
        WHERE product_id = $10`,
          [product_name, description, brand_id, category_id,price,sku,image,status,stock, id])
    
        if (dbResponse.rowCount > 0) {
          res.status(200).send({
            message: "Product updated"
          })
        } else {
          res.status(409).send({
            message: "Unable to update the product right now"
          })
        }
    
      } catch (error) {
        res.status(400).send({
          error
        })
      }
};

const deleteUser = async (req, res) => {
    const id = req.params.productid

    try {
      const dbResponse = await connect.query(`DELETE FROM products WHERE product_id = $1`, [id])
  
      if (dbResponse.rowCount > 0) {
        res.status(200).send({
          message: "Product deleted"
        })

      } else {
        res.status(409).send({
          message: "Unable to delete that product"
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