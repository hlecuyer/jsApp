var express = require('express');
var router = express.Router();


//[hugo] Inclusion du model
var mongoose = require('mongoose');
var Order = require('../models/Order.js');

//[hugo] GET orders liste. populate sert a hydrater mes articles pour me servir dans le scope deriere
router.get('/', function(req, res, next) {
	Order
		.find()
		.populate({
			path: 'articles',
			populate: { path: 'articleId' }
		})
		.exec(function (err, orders) {
    		if (err) return next(err);
    		res.json(orders);
		});
});

//[hugo] POST /orders
router.post('/', function(req, res, next) {
	console.log('Create order: ', req.body);
//	Counter.incCommand(function(err, orderNum) {
//			console.log('orderNum', orderNum);
//			if (err)
//				console.log(err);
//			req.body.orderNum = orderNum;
	Order.create(req.body, function (err, post) {
		console.log(err);
		if (err) return next(err);
		res.json(post);
	})}
//	);
);

//[hugo] Get /orders/:id
router.get('/:id', function(req, res, next) {
	Order
		.findById(req.params.id)
		.populate({
			path: 'articles',
			populate: { path: 'articleId' }
		})
		.exec(function (err, post) {
			console.log('erreur route /orders/:id: ', err);
    		if (err) return next(err);
    		res.json(post);
  		});
});

//[hugo] Put /orders/:id
router.put('/:id', function(req, res, next) {
	Order.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
		if (err) return next(err);
		console.log('Dans routes ligne 53: ', req.params.id, req.body);
		res.json(post);
	});
});


//[hugo] Put /orders/:id/newArticle
router.put('/:id/newArticle', function(req, res, next) {
	Order.findById(req.params.id, function (err, post) {
		if (err)
			return next(err);
		//utilisation de la methode ecrite dans modele.
		post.addArticle(req.body, function (err) {
			if (err)
				return next(err);
   			res.json(post);
		});
	});
});

//[hugo] Put /orders/:id/removeArticle
router.put('/:id/removeArticle', function(req, res, next) {
	Order.findById(req.params.id, function (err, post) {
		if (err)
			return next(err);
		post.removeArticle(req.body._id, function (err) {
			if (err){
				console.log(err);
				return next(err);
			}
			res.json(post);
		});
	});
});

//[hugo] Delete /orders/:id
router.delete('/:id', function(req, res, next) {
  Order.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
