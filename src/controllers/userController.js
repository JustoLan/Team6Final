const fs = require('fs');
const path = require('path');

let db = require('../database/models')
let Sequelize = db.sequelize
const Op = Sequelize.Op
const Users = require('../database/models/Users')
const bcrypt = require("bcrypt")

const controller = {
    register: (req, res) => {
        res.render('register', {
        });
    },

   /* create: (req, res) => {
        db.Users.create({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            sexo: req.body.sexo,
            email: req.body.email,
            celular: req.body.celular,
            password1: req.body.password1,
            password2: req.body.password2,
        }).catch(error => console.error("error en register main"))
    },*/ //NO LO PUDE HACER FUNCIONAR EN ESTE CONTROLLER CUANDO LE DABA A ENVIAR IBA DIRECTAMENTE A /REGISTER
    login: (req, res) => {
        res.render('login', {
        });
    },
};
module.exports = controller;