const express = require('express')
const app = express()
const { Router } = require('express')
const router = Router()

const path = require('path')


router.get('/', (req, res) => {
    res.render('main', {})
})    



module.exports = router