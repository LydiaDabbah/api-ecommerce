const { Router } = require('express')
const router = Router()

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
    
    


// CRUD PRODUCTOS
router.get('/products',getAllProducts)
router.get('/products/:productid',getProduct)
router.post('/products',addProduct)
router.put('/products/:productid',updateProduct)
router.delete('/products/:productid',deleteProduct)

//CRUD USERS
router.get('/users',getAllUsers)
router.get('/users/:userid',getUser)
router.post('/users',addUser)
router.put('/users/:userid',updateUser)
router.delete('/users/:userid',deleteUser)




module.exports = router