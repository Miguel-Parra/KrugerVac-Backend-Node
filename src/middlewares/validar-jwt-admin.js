const { request, response } = require("express")
const jwt = require('jsonwebtoken')

const validarJWTAdmin = (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'error en el token'
        })
    }

    try {
        const { id_empleado, rol, usuario} = jwt.verify(token, process.env.SECRET_JWT_SEED)
        if (Number(rol) !== 1){
            return res.status(401).json({
                ok: false,
                msg: 'Usuario no autorizado para esta acción'
            })

        }
        req.id_empleado = id_empleado;
        req.rol = rol;
        req.usuario = usuario;
        next();

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'token no válido'
        })
    }
}

module.exports = {
    validarJWTAdmin
}