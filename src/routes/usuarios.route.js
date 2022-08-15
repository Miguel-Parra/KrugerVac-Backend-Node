const {Router} = require ('express');
const { getUsuarios, obtenerUsuario, actualizarAdicional, agregarUsuario, eliminarUsuario, actualizarUsuario } = require('../controllers/usuarios.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarJWTAdmin } = require('../middlewares/validar-jwt-admin');
const { validarJWTUsuario } = require('../middlewares/validarJWTUsuario');


const router = Router();

router.get('/', validarJWTAdmin, getUsuarios);

router.post('/agregarUsuario', validarJWTAdmin, agregarUsuario);

router.get('/eliminar/:idUsuario', validarJWTAdmin, eliminarUsuario);

router.get('/obtener/:idUsuario', validarJWT, obtenerUsuario);

router.post('/actualizar/:idUsuario', validarJWTAdmin, actualizarUsuario);

router.post('/actualizarAdicional/:idUsuario', validarJWTUsuario, actualizarAdicional);








module.exports = router;