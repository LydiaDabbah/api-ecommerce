const connect = require("../database");

//CRUD PRODUCTS

const getAllProducts = async (req, res) => {

  try {
    const dbResponse = await connect.query(`
        SELECT  p.product_id,
                p.product_name,
                p.description,
                p.brand_id,
                b.brand_name,
                p.category_id,
                c.category_name,
                p.price, 
                p.sku,
                p.image,
                p.status,
                p.stock 
        FROM products AS p
        RIGHT JOIN brands AS b
        ON p.brand_id=b.brand_id
        RIGHT JOIN CATEGORIES AS c
        ON P.category_id=c.category_id`);

    res.status(200).send({
      data: dbResponse.rows,
    });
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
};


const getProduct = async (req, res) => {
    const id = req.params.productid
  
    try {
        const dbResponse = await connect.query(`
            SELECT  p.product_id,
                    p.product_name,
                    p.description,
                    p.brand_id,
                    b.brand_name,
                    p.category_id,
                    c.category_name,
                    p.price, 
                    p.sku,
                    p.image,
                    p.status,
                    p.stock 
            FROM products AS p
            RIGHT JOIN brands AS b
            ON p.brand_id=b.brand_id
            RIGHT JOIN CATEGORIES AS c
            ON P.category_id=c.category_id
            WHERE p.product_id=$1`, [id])
  
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

const addProduct = async (req, res) => {
    const { product_name, description, brand_id, category_id,price,sku,image,status,stock } = req.body
  
    try {
      const dbResponse = await connect.query(
        `INSERT INTO products (product_name, description, brand_id, category_id,price,sku,image,status,stock) 
        VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9)`,
        [product_name, description, brand_id, category_id,price,sku,image,status,stock]
      )
  
        if (dbResponse.rowCount > 0) {
        res.status(201).send({
          message: dbResponse
        })

      } else {
        res.status(409).send({
          message: "Unable to add the product right now"
        })
      }

        } catch (error) {
        res.status(409).send({
            error
        })
        }
  }
  
  

const updateProduct = async (req, res) => {
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

const deleteProduct = async (req, res) => {
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
  addProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct};
