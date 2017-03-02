
var moment = require('moment');


var vacinacaoController = function(vacinacaoModel){

	var salvarNovo = function(req, res){
		console.log(' ::: Salvar Nova vacinacao de Vacinação');
		var vacinacao = new vacinacaoModel(req.body);
		
		console.log(vacinacao);
		var msgObrigatorio = '';
		if(!req.body.idCartao) {
			msgObrigatorio+= 'Cartão é obrigatório.<br/>';
		}
		if(!req.body.nome) {
			msgObrigatorio+= 'Nome da vacina é obrigatório.<br/>';
		}

		if(msgObrigatorio != '') {
			res.status(400);
			res.send(msgObrigatorio);
		} else {
			vacinacao.save();
			res.status(201);
			res.send(vacinacao);	
		}

	};


	var substituir = function(req, res){
		console.log(' ::: Substituir vacinção');
		var vacinacao = req.vacinacao; // new vacinacaoModel(req.body);
		console.log(vacinacao);

		vacinacao.imagem = req.body.imagem;
		vacinacao.nome = req.body.nome;
		vacinacao.descricao = req.body.descricao;
		vacinacao.indicacaoProxima = req.body.indicacaoProxima;
		vacinacao.data = req.body.data;

		req.vacinacao.save(function(err){
			if(err){
				res.status(500).send(err);
			} else {
				res.json(req.vacinacao);
			}
		});
	};


	var atualizar = function(req, res){
		console.log(' ::: Atualizar Vacinação');
		if(req.body._id){
			delete req.body._id;
		}

		for(var p in req.body){
			req.vacinacao[p] = req.body[p];	
		}

		console.log(req.vacinacao);
		req.vacinacao.save(function(err){
			if(err){
				res.status(500).send(err);
			} else {
				res.json(req.vacinacao);
			}
		});
	};


	var remover = function(req, res){
		console.log(' ::: Remover vacinação');
		req.vacinacao.remove(function(err){
			if(err){
				res.status(500).send(err);
			} else {
				res.status(204).send('vacinacao removido.');
			}
		});
	
	};


	var listar = function(req, res){
		console.log(' ::: Listar vacinação');
		
		vacinacaoModel.find(req.query, function(err, vacinacaos){
			if(err){
				res.status(500).send(err);
			} else {
				var returnvacinacaos = [];
				vacinacaos.forEach(function(element, index, array){
					var vacinacaoObj = element.toJSON();
					returnvacinacaos.push(vacinacaoObj);
				});

				res.json(returnvacinacaos);
			}
		});
	};


	return {
		substituir 	: substituir,
		atualizar 	: atualizar,
		listar 		: listar,
		remover 	: remover,
		salvarNovo 	: salvarNovo
	};

};

module.exports = vacinacaoController;