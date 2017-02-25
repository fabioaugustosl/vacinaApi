
var moment = require('moment');


var eventoController = function(eventoModel){

	var salvarNovo = function(req, res){
		console.log(' ::: Salvar Nova Evento de Vacinação');
		var evento = new eventoModel(req.body);
		
		console.log(evento);
		var msgObrigatorio = '';
		if(!req.body.data) {
			msgObrigatorio+= 'Data é obrigatório.<br/>';
		}
		if(!req.body.descricao) {
			msgObrigatorio+= 'Descrição é obrigatório.<br/>';
		}

		if(msgObrigatorio != '') {
			res.status(400);
			res.send(msgObrigatorio);
		} else {
			evento.save();
			res.status(201);
			res.send(evento);	
		}

	};


	var substituir = function(req, res){
		console.log(' ::: Substituir evento de vacinção');
		var evento = req.evento; // new eventoModel(req.body);
		console.log(evento);

		evento.data = req.body.data;
		evento.imagem = req.body.imagem;
		evento.lat = req.body.lat;
		evento.long = req.body.long;
		evento.descricao = req.body.descricao;
		evento.endereco = req.body.endereco;

		req.evento.save(function(err){
			if(err){
				res.status(500).send(err);
			} else {
				res.json(req.evento);
			}
		});
	};


	var atualizar = function(req, res){
		console.log(' ::: Atualizar evento de Vacinação');
		if(req.body._id){
			delete req.body._id;
		}

		for(var p in req.body){
			req.evento[p] = req.body[p];	
		}

		console.log(req.evento);
		req.evento.save(function(err){
			if(err){
				res.status(500).send(err);
			} else {
				res.json(req.evento);
			}
		});
	};


	var remover = function(req, res){
		console.log(' ::: Remover evento de vacinção');
		req.evento.remove(function(err){
			if(err){
				res.status(500).send(err);
			} else {
				res.status(204).send('evento removido.');
			}
		});
	
	};


	var listar = function(req, res){
		console.log(' ::: Listar evento de vacinação');
		
		eventoModel.find(req.query, function(err, eventos){
			if(err){
				res.status(500).send(err);
			} else {
				var returneventos = [];
				eventos.forEach(function(element, index, array){
					var eventoObj = element.toJSON();
					returneventos.push(eventoObj);
				});

				res.json(returneventos);
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

module.exports = eventoController;