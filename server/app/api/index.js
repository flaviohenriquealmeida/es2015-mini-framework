/* Código simplório, apenas para fornecer o serviço para a aplicação */
var api = {}

api.listaSemana = function(req, res) {
    
    var date = new Date();

    var negociacoes = [
    	{ data : date, quantidade : 1, valor : 150},
    	{ data : date, quantidade : 2, valor : 250},
    	{ data : date, quantidade : 3, valor : 350}
   	];
    res.json(negociacoes);
};

api.listaAnterior = function(req, res) {
   
   var date = new Date();
   date.setDate(date.getDate() - 7);

    var negociacoes = [
    	{ data : date, quantidade : 1, valor : 450},
    	{ data : date, quantidade : 2, valor : 550},
    	{ data : date, quantidade : 3, valor : 650}
   	];
	setTimeout(function() {
		res.json(negociacoes);	
	}, 500);
    
};

api.listaRetrasada = function(req, res) {

   var date = new Date();
   date.setDate(date.getDate() - 14);

    var negociacoes = [
    	{ data : date, quantidade : 1, valor : 750},
    	{ data : date, quantidade : 2, valor : 950},
    	{ data : date, quantidade : 3, valor : 950}
   	];
    res.json(negociacoes);
    
};

module.exports = api;