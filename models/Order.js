var mongoose = require('mongoose');

//[hugo]Declaration de l'entite Order
var OrderSchema = new mongoose.Schema({
	orderNum: Number,
	deliveryDate: Date,
	status: String,
	articles:[{
		quantity: { type: Number, default: 0 },
		articleId: { type: mongoose.Schema.ObjectId, ref: 'Article' },
	}],
});


//[hugo]Ajout d'une methode pour ajout d'un article.
OrderSchema.methods = {
	addArticle: function (articleId, cb) {
		this.articles.push({ articleId: articleId, quantity: 1 });
		this.save(cb);
	},

//[hugo]Ajout d'une methode pour suppression d'un article.
	removeArticle: function (articleId, cb) {
		var arrayLength = this.articles.length;
		console.log('articleId', articleId);
		console.log('arrayLength', arrayLength);
		//[hugo]Recherche de l'article dans la liste.
		for (var index = 0; index < arrayLength; ++index) {
			if (this.articles[index]['articleId'] == articleId){
				console.log('articleId vire :', this.articles[index]['articleId'], index);
				break;
			}
		}
		console.log('index', index);
		//suppression
		if (index < arrayLength){
			this.articles.splice(index, 1);
		}
		else
			return cb('article not found');
		this.save(cb);
	},
}

module.exports = mongoose.model('Order', OrderSchema);