const { Client, Pool } = require('pg')

// const client = new Client({
//     user: process.env.PGUSER,
//     host: process.env.PGHOST,
//     database: process.env.PGDATABASE,
//     password: process.env.PGPASSWORD,
//     port: process.env.PGPORT,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });


const obtenerConexion = async () => {
    try {
        const client = new Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT,
          
        });
        await client.connect();
        
        return client;
    } catch (error) {
        console.log(error)
        throw new Error('Error al conectarse a la base de datos')
    }

}


module.exports = {
    obtenerConexion
}

