'use strict'

var Empresa = require('../models/empresa')

function addEmpresa(req, res){
    var empresa = new Empresa()
    var params = req.body

    if (params.name && params.description) {   
        empresa.name = params.name
        empresa.description = params.description
        empresa.employee = params.employee

        //Consulta base de datos
        Empresa.find({ $or: [
            { empresa : empresa.name}
        ]}).exec((err,empresas)=>{
            if (err) return res.status(500).send({message : 'Error en la peticion de empresas'})

            if (empresas && empresas.length >= 1){
                return res.status(500).send({ message : 'la empresa ya existe'})
            }else{
                
                empresa.save((err,savedEmpresa)=>{
                    if(err) return res.status(500).send({message : 'Error al guardar'})

                    if(savedEmpresa){
                        res.status(200).send({empresa : savedEmpresa })
                    }else{
                        res.status(404).send({message : 'No se ha podido agregar la empresa'})
                    }
                    
                })
            }
        })
    }else{
        res.status(200).send({message : 'Rellene todos los datos'})
    }
}

function editEmpresa(req, res){
    var empresaId = req.params.idEmpresa
    var cuerpo = req.body

    Empresa.findByIdAndUpdate(empresaId, cuerpo, {new: true},(err, empresaActualizada)=>{
        if (err) return res.status(500).send({message: 'Error en la peticion'})
        if (err) return res.status(404).send({message: 'No se ha podido actualizar los datos de la empresa'})
        
        return res.status(200).send({empresa: empresaActualizada})
    })
}

function getEmpresas(req, res){

    Empresa.find((err, empresas)=>{
        if(err) return res.status(500).send({message:'Error en la peticion'})
        if (!empresas) return res.status(404).send({message:'Error en la consulta de empresas'}) 
        return res.status(200).send({empresa: empresas})
    })
}

function getEmpresa(req, res) {
    var empresaId = req.params.idEmpresa
}

function deleteEmpresa(req, res){
    var empresaId = req.params.id

    Empresa.findByIdAndDelete(empresaId, (err, empresaEliminada)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion'})
        if(!empresaEliminada) return res.status(404).send({message: ' Error al eliminar la empresa'})
        return res.status(200).send({empresa: empresaEliminada})
    })
}

function cantidadEmpleados(req, res) {

    var empresaId = req.params.body.idEmpresa

    Empresa.findbyid(empresaId,(err, empleados)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion de datos'})
        if(!empleados) return res.status(404).send({message: 'Error en la busqueda de empleados'})
        return res.status(200).send({totalEmpleados: empleados})
    })
}

module.exports={
    addEmpresa,
    editEmpresa,
    getEmpresa,
    deleteEmpresa,
    cantidadEmpleados
}

