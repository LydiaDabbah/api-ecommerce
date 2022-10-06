const connect = require("../database");


//CRUD users    

const getAllOrders = async (req, res) => {

  try {
    const dbResponse = await connect.query(`
        SELECT
            o.order_id,
            o.user_id,
            u.first_name,
            u.last_name,
            O.status_id,s.status, 
            o.date 
        FROM orders AS O
        LEFT JOIN users as u
        ON u.user_id=o.user_id
        LEFT JOIN status as s
        ON s.status_id=o.status_id
        
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


const getOrderDetails = async (req, res) => {
    const id = req.params.orderid
  
    try {
        const dbResponse= await connect.query(`
        SELECT
            o.order_id,
            o.user_id,
            u.first_name,
            u.last_name,
            O.status_id,s.status, 
            o.date 
        FROM orders AS O
        LEFT JOIN users as u
        ON u.user_id=o.user_id
        LEFT JOIN status as s
        ON s.status_id=o.status_id
        WHERE order_id=$1`, [id])
        
        const dbResponse2= await connect.query(`
            SELECT 
                ot.product_id, 
                p.product_name,
                ot.unitary_price,
                ot.quantity, 
                ot.item_status
            FROM order_items as ot
            LEFT JOIN products as p
            ON p.product_id=ot.product_id
            WHERE ot.order_id=$1`,[id])

        if (dbResponse.rowCount > 0) {
            res.status(200).send({ 
                "order_id":dbResponse.rows[0].order_id,
                "user_id":dbResponse.rows[0].user_id,
                "first_name": dbResponse.rows[0].first_name,
                "last_name":dbResponse.rows[0].last_name,
                "status_id": dbResponse.rows[0].status_id,
                "status":dbResponse.rows[0].status,
                "date":dbResponse.rows[0].date,
                "order_items":dbResponse2.rows

            }
                
        )

        } else {
            res.status(404).send({
                message: 'order not found'
        })
        }
        

        } catch (error) {
            res.status(404).send({
                error
            })
        }
};

const addOrder  = async (req, res) => {
    
    const {user_id,status_id, date,order_items} = req.body

    try {

      // inserta los datos emn ORDERS
     const dbResponseOrder = await connect.query(
        `INSERT INTO orders(user_id,status_id, date) 
        VALUES  ($1, $2, $3)`,
        [user_id,status_id, date]
        
      )

      // recorre el array de order_items e inserta cada row
      
    for (let i = 0; i < order_items.length; i++) {
      const dbResponseOrderItems = await connect.query(
        `INSERT INTO order_items(product_id, order_id,unitary_price,quantity,item_status)
        VALUES	($1,	currval('orders_order_id_seq'::regclass),$2,$3,true);`,
        [order_items[i].product_id,order_items[i].unitary_price, order_items[i].quantity]   
      )
    }
      
  
    if (dbResponseOrder.rowCount > 0) {   
      res.status(201).send({
        message:` Order added succesfully`
  })
     } else{
      res.status(409).send({
        message: "Unable to add the order right now"
      })
     }

    /*
    if(dbResponseOrderItems.rowCount > 0) {
        res.status(201).send({
          message:`${message} Order_items added succesfully`
    })
      }else{
        res.status(409).send({
          message: "Unable to add the order items right now"
        })
      }
*/
    } catch (error) {
      res.status(409).send({
            error
      })
    }
  }
  
  

const updateOrder = async (req, res) => {
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
            message: "Unable to update the orderright now"
          })
        }
    
      } catch (error) {
        res.status(400).send({
          error
        })
      }
};


module.exports = {
  addOrder,
  getAllOrders,
  getOrderDetails,
  updateOrder,
 };

 /*
 {
  "user_id": 2,
  "status_id": 1,
  "date": "2022-10-03T05:00:00.000Z",
  "order_items": [
    {
      "product_id": 1,
      "unitary_price": "500.00",
      "quantity": 2
    },
    {
      "product_id": 4,
      "unitary_price": "1500.00",
      "quantity": 1
    }
  ]
}
*/ 