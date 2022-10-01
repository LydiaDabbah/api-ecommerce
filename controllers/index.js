
//products
const addProduct=(req,res)=>{
    console.log('produuct addded')
    console.log(req.body)

    const nombre=req.body.name // saco datos del body, obiamente datos que se que se van a enviar por las tamblas que tengo
    console.log(`El nombre es ${nombre}`)
    
    res.status(201).send(
        {
            'message':'product added'
        }
    )

}

const getAllProducts=(req,res)=>{
    console.log('get all products')

    res.status(200).send({ // status 200 es todo OK
        data:[
            {
                "name":"product 1",
                "price":500
            },
            {
                "name":"product 2",
                "price":20
            }
        ]       
        })
}

const getProduct=(req,res)=>{
    console.log('get a products')
}

const updateProduct=(req,res)=>{
    console.log('update a product')
}

const deleteProduct=(req,res)=>{
    console.log('delete a product')
}

const apiSuma=(req,res)=>{
    console.log(req.query)
   res.send(
    {
        "respuesta:":req.query.num1+req.query.num2
    }
   ) 
    
}

module.exports={
    addProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    apiSuma
}