'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var EmpresaSchema = Schema({
    name: String,
    descripcion: String,
    employee: Number
})

module.exports = mongoose.model('empresa', EmpresaSchema)