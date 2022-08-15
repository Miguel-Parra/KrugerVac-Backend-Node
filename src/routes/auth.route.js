const {Router} = require ('express');
const { check } = require('express-validator');
const { login, renovarToken } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

//Login de usuario
router.post('/', [
    check('usuario', 'el usuario es obligatorio').notEmpty(),
    check('password', 'el password es obligatorio').isLength({ min: 6 }),
    validarCampos
], login)

router.get('/validar_token', validarJWT, renovarToken)

module.exports = router;