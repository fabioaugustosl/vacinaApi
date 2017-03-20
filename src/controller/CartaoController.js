
var moment = require('moment');


var cartaoController = function(cartaoModel){

	var salvarNovo = function(req, res){
		console.log(' ::: Salvar novo cartão de Vacinação');
		var cartao = new cartaoModel(req.body);
		
		console.log(cartao);
		var msgObrigatorio = '';
		if(!req.body.dono) {
			msgObrigatorio+= 'Dono é obrigatório.<br/>';
		}
		if(!req.body.nomePessoa) {
			msgObrigatorio+= 'Nome pessoa é obrigatório.<br/>';
		}

		if(msgObrigatorio != '') {
			res.status(400);
			res.send(msgObrigatorio);
		} else {
			cartao.save();
			res.status(201);
			res.send(cartao);	
		}

	};


	var substituir = function(req, res){
		console.log(' ::: Substituir cartão');
		var cartao = req.cartao; // new cartaoModel(req.body);
		console.log(cartao);

		cartao.nomePessoa = req.body.nomePessoa;
		cartao.imagem = req.body.imagem;
		cartao.sexo = req.body.sexo;
		cartao.descricao = req.body.descricao;
		cartao.dataNascimento = req.body.dataNascimento;

		req.cartao.save(function(err){
			if(err){
				res.status(500).send(err);
			} else {
				res.json(req.cartao);
			}
		});
	};


	var atualizar = function(req, res){
		console.log(' ::: Atualizar cartão');
		if(req.body._id){
			delete req.body._id;
		}

		for(var p in req.body){
			req.cartao[p] = req.body[p];	
		}

		console.log(req.cartao);
		req.cartao.save(function(err){
			if(err){
				res.status(500).send(err);
			} else {
				res.json(req.cartao);
			}
		});
	};


	var remover = function(req, res){
		console.log(' ::: Remover cartão');
		req.cartao.remove(function(err){
			if(err){
				res.status(500).send(err);
			} else {
				res.status(204).send('cartao removido.');
			}
		});
	
	};


	var listar = function(req, res){
		console.log(' ::: Listar Cartão');
		
		cartaoModel.find(req.query, function(err, cartaos){
			if(err){
				res.status(500).send(err);
			} else {
				var returncartaos = [];
				cartaos.forEach(function(element, index, array){
					var cartaoObj = element.toJSON();
					returncartaos.push(cartaoObj);
				});

				res.json(returncartaos);
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

module.exports = cartaoController;