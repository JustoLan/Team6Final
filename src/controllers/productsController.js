const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let db = require('../database/models');
let sequelize = db.sequelize;

const controller = {
	// Root - Show all products
	root: (req, res) => {
		db.Ropas.findAll()
		.then(function(ropas){
			res.render('index', {ropas:ropas})
			thousandGenerator: toThousand
		}).catch(error => console.error("Error en root del productcontroller"));
	},
	catmujer: (req, res) => {
		db.Ropas.find
		res.render('products', {
			products,
			thousandGenerator: toThousand
		});
		
	},
	cathombre: (req, res) => {
		res.render('products', {
			products,
			thousandGenerator: toThousand
		});
		
	},


	// Det
	// Detail - Detail from one product
	detail: (req, res) => {
		//let pdtoID = req.params.productId;
		//let productFind = products.find(pdto => pdto.id == pdtoID);
		db.Ropas.findByPk(req.params.productId)
		.then(function(ropas) {
			res.render('detail', {ropas:ropas, thousandGenerator: toThousand});
		}).catch(error => console.error("Error en detail del productcontroller"));
	},

	// Create - Form to create
	create: (req, res) => {
		db.Ropas.create({
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: req.body.image,
			talle: req.body.talle
	})
	res.render('product-create-form.ejs')
},

	/*store: (req, res) => {
		req.body.price = Number(req.body.price);
		req.body.discount = Number(req.body.discount);
		let newProduct = {
			id: products[products.length - 1].id + 1,
			...req.body,
			
		};
		let finalProducts = [...products, newProduct];
		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
		res.redirect('/');
	},*/

	// Update - Form to edit
	edit: (req, res) => {
		db.Ropas.findByPk(req.params.productId)
		.then(function(ropas){
			res.render("product-edit-form",{ropas:ropas})
		})
	},
	// Update - Method to update
	update: (req, res) => {
		db.Ropas.update({
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: req.body.image,
			talle: req.body.talle
		},{
			where:{
				id: req.params.productId
			}}
		).then(res.redirect("/products/edit/" + req.params.productId))
		 .catch(error => console.error("error en productupdate"))},

		/*let newProducts = products.map(product => {
			if (product.id == productToEdit.id) {
				return product = {...productToEdit};
			}
			return product;
		}),

		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
		res.redirect('/');
	},*/

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		db.Ropas.destroy({
			where: {
				id: req.params.productId
			}
		})
	}
};

module.exports = controller;