var mongoose = require('mongoose'), Schema = mongoose.Schema;

var cartaoModel = new Schema({
	dono:{type:String},
	nomePessoa: {type:String},
	imagem: {type:String},
	sexo: {type: String},
	descricao: {type: String},
	dataNascimento:{ type: Date}
});

module.exports = mongoose.model('Cartao', cartaoModel);