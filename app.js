var express = require('express');
var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');
//var session = require('express-session');
var mongoose = require('mongoose');


var app = express();

var db = mongoose.connect('mongodb://localhost:27018/db_vacina');


var port = process.env.PORT || 3003;

// diretorios publicos
app.use(express.static('public'));

//middlaware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//app.use(cookieParser());
//app.use(session({secret: 'library'}));

//require('./src/config/passport')(app);


app.set('views','./src/views');

// template engine
//app.set('view engine', 'ejs');


//rotas

var eventoRouter = require('./src/routes/EventoRoutes');
var vacinacaoRouter = require('./src/routes/VacinacaoRoutes');
var cartaoRouter = require('./src/routes/CartaoRoutes');

app.use('/api/evento/v1', eventoRouter);
app.use('/api/vacinacao/v1', vacinacaoRouter);
app.use('/api/cartao/v1', cartaoRouter);


app.get('/', function(req, res){
	//res.render('index');
	res.send('de buenas vacinas');
	console.log('de buenas vacinas');
});

// start servidor
app.listen(port, function(err){
	console.log('running vacina api on '+port);
});


module.exports = app;

