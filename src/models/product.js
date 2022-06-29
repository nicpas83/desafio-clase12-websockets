class Product{

    products = [
        {
            title: 'Tablet',
            price: '6500',
            thumbnail: 'https://stylewatch.vtexassets.com/arquivos/ids/191755-800-auto?width=800&height=auto&aspect=true',
            id: 1
          }
    ];

    constructor(title, price, thumbnail){
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }

    getAll(){
        return this.products
    }

    getById(id){
        
        return new Promise((resolve, reject) => {
            const product = this.products.filter( item => { 
                return item.id == id 
            })
            if(product.length > 0){
                resolve(product)
            }else{
                reject('El producto no existe')
            }
        })
    }

    saveProduct(product){

        return new Promise((resolve, reject) => {
            if(!product){
                reject('Debe ingresar un producto')
            }else{
                let newId = this.products.length + 1
                product.id = newId
                this.products.push(product)
                resolve(product)
            }
        })
    }

    updateProduct(product){

        return new Promise((resolve, reject) => {

            let update = false
            this.products.forEach((value, index) => {
                if(value.id == product.id){
                    update = true
                    this.products[index].title = product.title
                    this.products[index].price = product.price
                    this.products[index].thumbnail = product.thumbnail

                    resolve()
                }
            });
            reject('El producto que intenta actualizar no existe.')
        })
        
    }

    deleteProduct(id){

        return new Promise((resolve, reject) => {
            this.products.forEach((value, index) => {
                if(value.id == id){
                    this.products[index] = null
                    resolve()
                }
            })
            reject('El producto no existe')
        })
        
    }


}

module.exports = Product