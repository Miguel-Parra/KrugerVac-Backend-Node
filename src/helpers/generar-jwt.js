const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const generarJWT = (id_empleado, usuario, rol) => {
    const payload = { id_empleado, usuario, rol };

    //transformando a promesa
    const promesaJWT = promisify(jwt.sign)
    return promesaJWT(payload, process.env.SECRET_JWT_SEED, {
        expiresIn: '24h'
    })
}

module.exports = {
    generarJWT
}