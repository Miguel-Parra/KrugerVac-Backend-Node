const { request, response } = require("express");
const { obtenerConexion } = require("../db/config");
const bcrypt = require('bcryptjs');


const getUsuarios = async (req = request, res = response) => {
    const { cedula } = req.query;
    let consulta = " select e.* from empleado e join rol_empleado re on e.id_empleado = re.id_empleado join rol r on r.id_rol = re.id_rol  where e.estado = true and r.id_rol = 2"
    if (cedula) {
        consulta = `${consulta} and e.cedula = '${cedula}' `
    }
    try {
        const conexion = await obtenerConexion();
        const { rows } = await conexion.query(consulta);
        await conexion.end();
        const datos = rows.map((empleado) => {
            const { password, estado, ...datos } = empleado;
            return datos;
        })

        return res.json({
            ok: true,
            usuarios: datos,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}




const agregarUsuario = async (req = request, res = response) => {
    const { cedula, nombres, apellidos, vacunado, usuario, email, estado } = req.body.usuario;
    let { password } = req.body.usuario;
    try {
        const salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, salt);

        const usuarioARegistrar = {
            cedula,
            nombres,
            apellidos,
            vacunado,
            usuario,
            password,
            email,
            estado
        }

        const conexion = await obtenerConexion();
        const { rows } = await conexion.query("select guardarUsuario($1)", [usuarioARegistrar]);
        await conexion.end();

        return res.json({
            ok: true,
            usuario: rows,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const eliminarUsuario = async (req = request, res = response) => {
    const { idUsuario } = req.params;
    try {
        const conexion = await obtenerConexion();
        const { rows } = await conexion.query("update empleado set estado = false where id_empleado = $1", [idUsuario]);
        await conexion.end();
        return res.json({
            ok: true,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const obtenerUsuario = async (req = request, res = response) => {
    const { idUsuario } = req.params;
    try {
        const conexion = await obtenerConexion();
        const { rows } = await conexion.query("select e.* from empleado e join rol_empleado re on e.id_empleado = re.id_empleado join rol r on r.id_rol = re.id_rol  where e.estado = true and r.id_rol = 2 and e.id_empleado = $1", [idUsuario]);
        await conexion.end();

        return res.json({
            ok: true,
            empleado: rows
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


const actualizarUsuario = async (req = request, res = response) => {
    const { cedula, nombres, apellidos, usuario, email } = req.body.usuario;
    const { idUsuario } = req.params;

    let { password } = req.body.usuario;
    try {
        const salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, salt);

        const conexion = await obtenerConexion();
        const { rows } = await conexion.query("update empleado set cedula=$1, nombres=$2,  apellidos=$3, usuario=$4, email=$5, password=$6 where id_empleado = $7;", [cedula, nombres, apellidos, usuario, email, password, idUsuario]);
        await conexion.end();
        return res.json({
            ok: true,
            usuario: rows,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const actualizarAdicional = async (req = request, res = response) => {
    const { fecha_nacimiento, direccion_domicilio, telefono_movil} = req.body.informacion;
    const { idUsuario} = req.params;
    const {rol} = req;


    try {
   
        const conexion = await obtenerConexion();
        await conexion.query("update empleado set fecha_nacimiento=$1, direccion_domicilio=$2,  telefono_movil=$3 where id_empleado = $4;", [fecha_nacimiento, direccion_domicilio, telefono_movil, idUsuario]);
        const { rows } = await conexion.query("select * from empleado where id_empleado=$1", [idUsuario])
        await conexion.end();
        console.log(rol)
        const { password, estado, ...datos } = rows[0]
        return res.json({
            ok: true,
            resp: datos,
            rol
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    agregarUsuario,
    eliminarUsuario,
    getUsuarios,
    obtenerUsuario,
    actualizarUsuario,
    actualizarAdicional
}