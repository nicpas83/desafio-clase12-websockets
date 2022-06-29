const { Router } = require('express')
const router = Router()

const Product = require('../models/product')
const obj = new Product('', 0, '')

router.get('/', (req, res) => {
    const products = obj.getAll()
    let productsExists = false;
    if(products.length > 0){
        productsExists = true;
    }
    console.log(products)
    res.render('productos-index', {products, productsExists})
})

router.post('/', (req, res) => {
    const { title, price, thumbnail } = req.body
    const product = { title, price, thumbnail }

    const save = obj.saveProduct(product)

    // save.then(() => {
    //     res.render('main', {})
    // })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    const product = obj.getById(id)

    product
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => {
            res.sendStatus(404)
            console.error(error)
        })
})



router.put('/:id', (req, res) => {
    const { title, price, thumbnail } = req.body
    const product = { title, price, thumbnail }
    product.id = req.params.id

    const update = obj.updateProduct(product)
    update
        .then(() => {
            res.sendStatus(200)
        })
        .catch((e) => {
            res.sendStatus(400)
            console.log(e)
        })

})

router.delete('/:id', (req, res) => {
    obj.deleteProduct(req.params.id)
        .then(() => {
            res.sendStatus(200)
        })
        .catch((e) => {
            res.sendStatus(400)
            console.log(e)
        })
})


module.exports = router