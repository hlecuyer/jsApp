var mongoose = require('mongoose');

//[hugo]Declaration de l'entite Article
var ArticleSchema = new mongoose.Schema({
  name: String,
  price: Number,
  reference: String,
});

module.exports = mongoose.model('Article', ArticleSchema);