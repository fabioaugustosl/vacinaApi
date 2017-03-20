var express = require('express');

var vacinacaoModel = require('../models/VacinacaoModel');

var vacinacaoRouter = express.Router();

var vacinacaoController = require('../controller/VacinacaoController')(vacinacaoModel);


vacinacaoRouter.route('/')
		.post(function(req, res){
			vacinacaoController.salvarNovo(req, res);
		})
		.get(function(req, res){
			vacinacaoController.listar(req, res);
		});


vacinacaoRouter.use('/:vacinacaoId', function(req, res, next){
	// esse é nosso middleware
	vacinacaoModel.findById(req.params.vacinacaoId, function(err, vacinacao){
		if(err){
			res.status(500).send(err);
		} else if(vacinacao) {
			req.vacinacao = vacinacao;
			next();
		} else {
			res.status(404).send('vacinacao não encontrado');
		}
	});
});


vacinacaoRouter.route('/:vacinacaoId')
		.get(function(req, res){
			res.json(req.vacinacao);
		})
		.put(function(req, res){
			vacinacaoController.substituir(req, res);
		})
		.patch(function(req, res){
			vacinacaoController.atualizar(req, res);
		})
		.delete(function(req, res){
			vacinacaoController.remover(req, res);
		});
		

module.exports = vacinacaoRouter;
