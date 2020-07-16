'user strict'

var User = require('../models/user')
var bcrypt = require('bcrypt-nodejs')
var jwt = require('../services/jwt')

function login(req,res){
    var params = req.body;

    User.findOne({user: params.user}, (err,user)=>{
        if (err) return res.status(500).send({message: 'Error de peticion'})

        if (user) {
            bcrypt.compare(params.password,user.password,(err,check)=>{
                if (check) {
                    if (params.gettoken) {
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        })
                    }else{
                        user.password = undefined;
                        return res.status(200).send({user})
                    }
                }else{
                    return res.status(404).send({message: 'El usuario no se ha podido identificar'})
                }
            })
        }else{
            return res.status(404).send({message: 'El usuario no se ha podido logear'})
        }
    })
}

module.exports = {
    login
}