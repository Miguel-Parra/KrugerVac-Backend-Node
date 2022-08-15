const {Router} = require ('express');
const { getVacunas, agregarVacuna, consultarVacunasUsuario } = require('../controllers/vacunas.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarJWTUsuario } = require('../middlewares/validarJWTUsuario');



const router = Router();


router.get('/', validarJWT, getVacunas);
router.post('/agregar', validarJWTUsuario, agregarVacuna);
router.get('/usuario/:idUsuario', validarJWT, consultarVacunasUsuario);










module.exports = router;