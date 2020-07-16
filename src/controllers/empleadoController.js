'use strict'

var Save = require('./save')
var Empleado = require('../models/empleado')


const createEmpleado = async (name = '', job = '', empresa) => {
    try {
        name = name.trim()
        job = job.trim()
        if(name && job && empresa) {
            return await Save.createEmpleado({ name, job, empresa })
        }
        throw new Error
    } catch (error) {
        console.error(error)
        throw error
    }
}

const findEmpleados = async (_id, name = '', job = '', empresa) => {
    let filter = {}
    try {
        if(_id) {
            filter._id = _id
        } else if(name) {
            filter.name = { $regex: `.*${name}.*` }
        } else if(job) {
            filter.job = { $regex: `.*${job}.*` }
        } else if(empresa) {
            filter.empresa = empresa
        }
        return await Save.findEmpleados(filter)
    } catch (error) {
        console.error(error)
        throw error
    }
}

const updateEmpleado = async (_id, name = '', job = '', empresa) => {
    let updatedEmpleado = {}
    try {
        name = name.trim()
        job = job.trim()
        if(_id) {
            if(name) updatedEmpleado.name = empleado_name
            if(job) updatedEmpleado.job = job
            if(empresa) updatedEmpleado.empresa = empresa
            if(Object.keys(updatedEmpleado).length != 0) return await Save.updateEmpleado(_id, updatedEmpleado)
        }
        throw new Error('Missing Data')
    } catch (error) {
        console.error(error)
        throw error
    }
}

const deleteEmpleado = async (_id) => {
    try {
        if(_id) {
            return await Save.deleteEmpleado(_id)
        }
        throw new Error('Missing Data')
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = {
    createEmpleado, 
    findEmpleados, 
    updateEmpleado, 
    deleteEmpleado
}
