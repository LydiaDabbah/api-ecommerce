const { Router } = require('express')
const router = Router()

const { addProduct,
        getAllProducts,
        getProduct,
        updateProduct,
        deleteProduct,
        apiSuma} = require('../controllers')

// CRUD PRODUCTOS
router.post('/products',addProduct)
router.get('/products',getAllProducts)
router.get('/products/:productid',getProduct)
router.put('/products/:productid',updateProduct)
router.delete('/products/:productid',deleteProduct)

// ejercicio suma
router.get('/api/suma',apiSuma)

module.exports = router