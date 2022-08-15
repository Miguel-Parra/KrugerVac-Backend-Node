const {response} = require('express') //solo colocamos para tener el tipado
const {validationResult} = require('express-validator')

const validarCampos = (req, res = response, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            msg: "Campos con errores"
        }) 
    }
    next();
}


module.exports = {
    validarCampos
}