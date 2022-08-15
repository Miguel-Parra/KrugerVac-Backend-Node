const { response } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const bcrypt = require('bcryptjs');
const { obtenerConexion } = require('../db/config');


const login = async (req, res = response) => {
    const { usuario, password, rol } = req.body;
    
    try {
        const conexion = await obtenerConexion();
        
        //verificar usuario
        const { rows } = await conexion.query("select e.* from empleado e join rol_empleado re on e.id_empleado = re.id_empleado join rol r on r.id_rol = re.id_rol  where e.usuario = $1 and r.id_rol = $2 and e.estado = $3;", [usuario, rol, true]);
        await conexion.end();
        if (rows.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: "rol o usuario/contraseña incorrectos"
            })
        }

        const usuarioDB = rows[0]
   

        //verificar password
        const passwordIgual = bcrypt.compareSync(password, usuarioDB.password);
       
        if (passwordIgual) {
            //generar el JWT
            const token = await generarJWT(usuarioDB.id_empleado, usuario, rol)
            
            const { password, estado, ...datos } = usuarioDB
            datos.rol = rol;

            //respuesta servicio
            return res.json({
                ok: true,
                resp: datos,
                token
            })

        } else {
            return res.status(400).json({
                ok: false,
                msg: "rol o usuario/contraseña incorrectos"
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const renovarToken = async (req, res = response) => {
    const {rol, usuario} = req;

    try {
        const conexion = await obtenerConexion();
    
        //verificar usuario
        const { rows } = await conexion.query("select e.* from empleado e join rol_empleado re on e.id_empleado = re.id_empleado join rol r on r.id_rol = re.id_rol  where e.usuario = $1 and r.id_rol = $2 and e.estado = $3;", [usuario, rol, true]);
        await conexion.end();
        const usuarioDB = rows[0]

        const token = await generarJWT(usuarioDB.id_empleado, usuario, rol)
            
        const { password, estado, ...datos } = usuarioDB
        datos.rol = rol;

        //respuesta servicio
        return res.json({
            ok: true,
            resp: datos,
            token
        })

    } catch (error) {
        console.log( error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    login,
    renovarToken
}