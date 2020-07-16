'use strict'

var express = require("express")
var empresaController = require("../controllers/empresaController")
var md_auth = require("../middlewares/authenticated")
var empleadoController = require("../controllers/empleadoController")



//RUTAS

var api = express.Router()
api.post('/addEmpresa',empresaController.addEmpresa)
api.put('/editEmpresa/idEmpresa',empresaController.editEmpresa)
api.get('/getEmpresa',empresaController.getEmpresa)
api.delete('/deleteEmpresa/id',empresaController.deleteEmpresa)




module.exports = api


