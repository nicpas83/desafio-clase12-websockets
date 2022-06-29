const express = require('express')
const app = express()
const puerto = 8080
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

//configuración
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const path = require('path')

//motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views/layouts'));

//establecer el espacio público del servidor
app.use('/', express.static(path.join(__dirname + '/public')));
app.use('/plantillas', express.static(path.join(__dirname + '/views/components')));

// Importo clases
const Product = require('./models/product')
const ChatMessage = require('./models/chat-message')
const objProduct = new Product(0, '', 0)
const objChatMessage = new ChatMessage()

//Rutas
const rutas = require('./routes/index')
const productos = require('./routes/productos')
app.use('/', rutas);
app.use('/productos', productos)


//Enciendo conexión socket
io.on('connection', async socket => {
    console.log('user connected')
    //traigo productos y mensajes
    let productList = await objProduct.getAll()
    let messageList = await objChatMessage.getAll()
    
    //Emisión
    socket.emit('product-list', productList)
    socket.emit('message-list', messageList)

    
    
    //Recepción
    socket.on('new-product', async product => {
        objProduct.saveProduct(product)
        productList = await objProduct.getAll()
        io.emit('product-list', productList)
    })
    socket.on('new-message', async message => {
        await objChatMessage.save(message);
        messageList = await objChatMessage.getAll()
        
        io.emit('message-list', messageList)

    })

})




server.listen(puerto, (error) => {
    if (error) {
        console.log(`Se produjo un error en el servidor`)
        console.error(error)
    } else {
        console.log(`Servidor iniciado en el puerto ${puerto}`)
    }
})