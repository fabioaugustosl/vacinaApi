var mongoose = require('mongoose'), Schema = mongoose.Schema;

var vacinacaoModel = new Schema({
	idPessoa: {type:String},
	nomePessoa: {type:String},
	imagem: {type:String},
	nome: {type: String},
	descricao: {type: String},
	indicacaoProxima: {type: String},
	data:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('Vacinacao', vacinacaoModel);