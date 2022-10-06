const { Router } = require('express')
const router = Router()
const { verifyToken } = require('../middlewares')

const { addProduct,
        getAllProducts,
        getProduct,
        updateProduct,
        deleteProduct} = require('../controllers/products')

const { addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser} = require('../controllers/users')
    
const { addOrder,
    getAllOrders,
    getOrderDetails,
    updateOrder,
    deleteOrder} = require('../controllers/orders')   
    
const {loginController} = require('../controllers/login')   
        

// CRUD PRODUCTOS
router.get('/products',getAllProducts)
router.get('/products/:productid',getProduct)
router.post('/products',verifyToken,addProduct)
router.put('/products/:productid',verifyToken,updateProduct)
router.delete('/products/:productid',verifyToken,deleteProduct)

//CRUD USERS
router.get('/users',getAllUsers)
router.get('/users/:userid',getUser)
router.post('/users',addUser)
router.put('/users/:userid',updateUser)
router.delete('/users/:userid',deleteUser)

//CRUD ORDERS
router.get('/orders',getAllOrders)
router.get('/orders/:orderid',getOrderDetails)
router.post('/orders',addOrder)
router.put('/orders/:orderid',updateOrder)

//Login
router.post('/login',loginController)

module.exports = router