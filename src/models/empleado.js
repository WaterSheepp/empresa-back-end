'user strict'

var mongoose = require("mongoose")
var Schema = mongoose.Schema

var EmpleadoSchema = Schema({
    name: String,
    job: String,
    empresa: { type: Schema.Types.ObjectId, required: true, ref: 'empresa' }

})

module.exports = mongoose.model('empleado', EmpleadoSchema)
