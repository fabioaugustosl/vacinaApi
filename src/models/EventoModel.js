var mongoose = require('mongoose'), Schema = mongoose.Schema;

var eventoModel = new Schema({
	data:{ type: Date},
	lat:{ type:Number},
	long:{ type:Number},
	endereco:{ type:String},
	descricao:{ type:String},
	imagem:{ type:String}
});

module.exports = mongoose.model('Evento', eventoModel);