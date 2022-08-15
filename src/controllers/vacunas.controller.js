const { request, response } = require("express");
const { obtenerConexion } = require("../db/config");
const bcrypt = require('bcryptjs');
const { param } = require("../routes/auth.route");


const getVacunas = async (req = request, res = response) => {
    let consulta = " select *from vacuna"

    try {
        const conexion = await obtenerConexion();
        const { rows } = await conexion.query(consulta);
        await conexion.end();
        return res.json({
            ok: true,
            vacunas: rows,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}




const agregarVacuna = async (req = request, res = response) => {
    const { nombre: id_vacuna, fecha_vacunacion, dosis } = req.body.vacuna;
    const id_empleado = req.id_empleado
    const vacunaAregistrar = {
        id_vacuna,
        id_empleado,
        fecha_vacunacion,
        dosis
    }

    try {
        const conexion = await obtenerConexion();
        const { rows } = await conexion.query("select resgistrarVacuna($1);", [vacunaAregistrar]);
        await conexion.end();
        return res.json({
            ok: true,
            vacuna: rows,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const consultarVacunasUsuario = async (req = request, res = response) => {
    const consulta = "select v.nombre, ev.fecha_vacunacion, ev.dosis from vacuna v join empleado_vacuna ev on v.id_vacuna = ev.id_vacuna join empleado e on e.id_empleado = ev.id_empleado where e.id_empleado = $1;"
    const { idUsuario } = req.params;
    try {
        const conexion = await obtenerConexion();
        const { rows } = await conexion.query(consulta, [idUsuario]);
        await conexion.end();
        return res.json({
            ok: true,
            vacunas: rows,
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
    getVacunas,
    agregarVacuna,
    consultarVacunasUsuario

}