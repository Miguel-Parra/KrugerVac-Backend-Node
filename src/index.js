require('dotenv').config(); //para configurar las variables de entorno
const Server = require('./models/servidor')

const server = new Server();

server.listen();

