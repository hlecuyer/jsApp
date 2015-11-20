var express = require('express');
var router = express.Router();


//[hugo] Inclusion du model
var mongoose = require('mongoose');
var Article = require('../models/Article.js');

//[hugo] GET articles liste.
router.get('/', function(req, res, next) {
	Article.find(function (err, articles) {
    	if (err) return next(err);
    		res.json(articles);
	});
});

//[hugo] POST /articles
router.post('/', function(req, res, next) {
	Article.create(req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

//[hugo] Get /articles/:id
router.get('/:id', function(req, res, next) {
  Article.findById(req.params.id, function (err, post) {
	console.log('erreur route : ', err);
    if (err) return next(err);
    res.json(post);
  });
});

//[hugo] Put /articles/:id
router.put('/:id', function(req, res, next) {
	Article.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

//[hugo] Delete /articles/:id
router.delete('/:id', function(req, res, next) {
  Article.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
