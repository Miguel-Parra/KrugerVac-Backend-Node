const express = require('express');
const { obtenerConexion } = require('../db/config');
const cors = require('cors')

class Servidor {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            usuarios: '/api/usuarios',
            vacunas: '/api/vacunas',
            auth: '/api/auth'
        }
        this.middlewares();
        this.rutas();
    }


    middlewares() {
        //cors
        this.app.use(cors());

        //lectura y parseo del body
        this.app.use(express.json());

        //directorio público
        this.app.use(express.static('src/public'))
    }

    rutas() {
        this.app.use(this.paths.usuarios, require('../routes/usuarios.route'));
        this.app.use(this.paths.vacunas, require('../routes/vacunas.route'));
        this.app.use(this.paths.auth, require('../routes/auth.route'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto ", this.port)
        })
    }

    async conectarBD() {
        await obtenerConexion();
    }


}


module.exports = Servidor;
