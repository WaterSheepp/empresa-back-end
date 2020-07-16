'use strict'
const Model = require('./model')
const StoreEmpresa = require('../empresas/store')

exports.createEmpleado = async (empleado) => {
    try {
        const newEmpleado = new Model(empleado)
        const findedEmpresa = (await StoreEmpresa.findEmpresas({ _id: empleado.empresa })).pop()
        if(!findedEmpresa) throw new Error('Not Found')
        await StoreEmpresa.updateEmpresa(empleado.empresa, { $inc: { personal: 1 } })
        return await newEmpleado.save()
    } catch (error) {
        console.error(error)
        throw error
    }
}

exports.findEmpleados = async (filter) => {
    try {
        const empleados = await Model.find(filter).populate('empresa').exec()
        return empleados
    } catch (error) {
        console.error(error)
        throw error
    }
}

exports.updateEmpleado = async (_id, updatedEmpleado) => {
    try {
        if(updatedEmpleado.empresa) {
            const empresaForUpdate = (await StoreEmpresa.findEmpresas({ _id: updatedEmpleado.empresa })).pop()
            if(!empresaForUpdate) throw new Error('Not Found')
        }
        const preUpdatedEmpleado = await Model.findByIdAndUpdate(_id, updatedEmpleado)
        if(updatedEmpleado.empresa) {
            await StoreEmpresa.updateEmpresa(updatedEmpleado.empresa, { $inc: { personal: 1 } })
            await StoreEmpresa.updateEmpresa(preUpdatedEmpleado.empresa, { $inc: { personal: -1 } })
        }
        if(!preUpdatedEmpleado) throw new Error('Not Found')
        return preUpdatedEmpleado
    } catch (error) {
        console.error(error)
        throw error
    }
}

exports.deleteEmpleado = async (_id) => {
    try {
        const empleadoDeleted = await Model.findByIdAndUpdate(_id)
        await StoreEmpresa.updateEmpresa(empleadoDeleted.empresa, { $inc: { personal: -1 } })
        if(!empleadoDeleted) throw new Error('Not Found')
        return empleadoDeleted
    } catch (error) {
        console.error(error)
        throw error
    }
}