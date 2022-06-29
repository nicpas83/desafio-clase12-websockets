fs = require('fs')
const path = require('path')

class ChatMessage {

    fileName;

    constructor() {
        this.fileName = path.resolve(__dirname, '../storage/chat-messages.txt');
    }

    async save(data) {
        let contentFile = await this.getAll();

        //defino id
        data.id = 1;
        if (contentFile.length > 0) {
            let lastId = this.getLastId(contentFile);
            data.id = lastId + 1;
        } 

        //agrego data
        contentFile.push(data);

        let newContentFile = JSON.stringify(contentFile);

        try {
            await fs.promises.writeFile(this.fileName, newContentFile)
        }
        catch (error) {
            console.log('Ocurrió un error al intentar grabar el archivo', error)
        }
    }

    async getById(id) {
        let data = null;
        let contentFile = await this.getAll();

        if (contentFile.length > 0) {
            contentFile.forEach(function (val) {
                if (val.id == id) {
                    data = val;
                }
            })
        }
        return data;
    }

    async getAll() {
        let data = [];
        try {
            let contentFile = await fs.promises.readFile(this.fileName, 'utf-8');
            if (contentFile.length > 0) {
                data = JSON.parse(contentFile);
            }
            return data;
        }
        catch (error) {
            console.log('Error de lectura: ', error)
        }
    }

    deleteById(id) {

        if (this.getById(id)) {
            let data = this.getAll();
            let newData = JSON.stringify(data.filter(val => val.id != id));

            try {
                //sobreescribo el file
                fs.writeFileSync(this.fileName, newData)
            } catch (error) {
                console.error(error);
            }

        } else {
            console.log('El producto que intenta eliminar no existe')
        }
    }

    deleteAll() {
        fs.unlink(this.fileName, error => {
            if(error){
                console.log('No fue posible borrar los productos del archivo.')
            }else{
                console.log('Los productos del archivo fueron eliminados.')
            }
        });
    }


    getLastId(contentFile) {
        let ids = contentFile.map(object => {
            return object.id
        })

        return Math.max(...ids)
    }

    async getRandomMessage(){

        let messages = await this.getAll()
        let max = messages.length
        let min = 1
        let randomId = Math.floor(Math.random() * (max - min + 1) + min)

        let randomMessage = await this.getById(randomId)

        return randomProduct
    }
}

module.exports = ChatMessage
