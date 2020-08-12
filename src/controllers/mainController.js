const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
let {check, validationResult, body} = require("express-validator")
//const PROHOMBRE = products.filter(pdto => pdto.category == 'HOMBRE');
//const PROMUJER = products.filter(pdto => pdto.category == 'MUJER');
let errors = [];
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const SSequelize = require("sequelize")
let db = require('../database/models')
let Sequelize = db.sequelize
const Op = SSequelize.Op
//const Ropas = require('../database/models/Ropa')

const controller = {
	root: (req, res) => {
		db.Ropas.findAll({
			where: {
				[db.Sequelize.Op.or]:[{category:"hombre"},{category:"mujer"}]},
				order:[
					["category","ASC"]
				],
				limit:5
			})
			.then(function(ropas,ropasm){
				res.render('index', {ropas:ropas, ropasm:ropasm})
				thousandGenerator: toThousand
			})
			.catch(error => console.error(error));
		},
		//MODIFICADO
		catmujer: (req, res) => {
			db.Ropas.findAll({
				where:{category:"mujer"},
				order:[
					["name","ASC"]
				]
			})
			.then(function(ropasm){
				res.render('catmujer', {ropasm:ropasm})
				thousandGenerator: toThousand
			}).catch(error => console.error("Error en catmujer del maincontroller"));
		},
		
		cathombre: (req, res) => {
			db.Ropas.findAll({
				where:{category:"hombre"}
			})
			.then(function(ropash){
				res.render('cathombre', {ropash:ropash})
				thousandGenerator: toThousand
			}).catch(error => console.error("Error en catmujer del maincontroller"));
		},
		create: (req, res) => {
		  let errors = validationResult(req);
		  if (errors.isEmpty()){
			db.Users.create({
				nombre: req.body.nombre,
				apellido: req.body.apellido,
				sexo: req.body.sexo,
				email: req.body.email,
				celular: req.body.celular,
				password1: req.body.password1,
				password2: req.body.password2,
			}).then(res.redirect('/'))
			.catch(error => console.error("error en register main"))}
			else{
				return (res.render("register", {errors:errors.errors}))
			}
		},
		search: (req, res) => {
			let word = req.query.keywords
			db.Ropas.findAll({
				where:{name:{[Op.like]:"%" + word + "%"}},
				order:[
					["category","ASC"]
				]
			}).then(function(ropas){(res.render('results', {ropas:ropas, word:word})
			)}).catch(error => console.error("error en searchcontroller"));
		},
	};

	module.exports = controller;
