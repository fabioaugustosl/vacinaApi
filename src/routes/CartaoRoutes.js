var express = require('express');

var cartaoModel = require('../models/CartaoModel');

var cartaoRouter = express.Router();

var cartaoController = require('../controller/CartaoController')(cartaoModel);


cartaoRouter.route('/')
		.post(function(req, res){
			cartaoController.salvarNovo(req, res);
		})
		.get(function(req, res){
			cartaoController.listar(req, res);
		});


cartaoRouter.use('/:cartaoId', function(req, res, next){
	// esse é nosso middleware
	cartaoModel.findById(req.params.cartaoId, function(err, cartao){
		if(err){
			res.status(500).send(err);
		} else if(cartao) {
			req.cartao = cartao;
			next();
		} else {
			res.status(404).send('cartao não encontrado');
		}
	});
});


cartaoRouter.route('/:cartaoId')
		.get(function(req, res){
			res.json(req.cartao);
		})
		.put(function(req, res){
			cartaoController.substituir(req, res);
		})
		.patch(function(req, res){
			cartaoController.atualizar(req, res);
		})
		.delete(function(req, res){
			cartaoController.remover(req, res);
		});
		

module.exports = cartaoRouter;
