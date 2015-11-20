//[hugo]tentative de mise en place d'une autoincrementation: Abort

var mongoose = require('mongoose');

//[hugo]Declaration de l'entite Counter (permet l'auto incrementation pour les commandes)
var CounterSchema = new mongoose.Schema({
  seq: Number,
});

module.exports = mongoose.model('Counter', CounterSchema);

CounterSchema.statics = {
	incCommand: function(cb){
		console.log('passage ici');
		this.findOneAndUpdate({}, { $inc: { seq: 1 } }, function (err, counter) {
			if (err)
				cb(err);
			else
				cb(null, counter.seq);
		});
	}
};