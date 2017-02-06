class NegociacaoService {
    
    constructor(http) {
        this.http = http;
    }
      
    obterNegociacoesDaSemana() {
      
       return new Promise((resolve, reject) => {
           
         this.http.get('negociacoes/semana').then(dados => {
             resolve(dados.map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor)));
         }).catch((erro) => reject('Não foi possível obter as negociações da semana'));
       });
                
    }
    
    obterNegociacoesDaSemanaAnterior() {
        
       return new Promise((resolve, reject) => {
           
         this.http.get('negociacoes/anterior').then(dados => {
             resolve(dados.map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor)));
         }).catch((erro) => reject('Não foi possível obter as negociações da semana anterior'));
       });
        
    }
        
    obterNegociacoesDaSemanaRetrasada() {
        
       return new Promise((resolve, reject) => {
           
         this.http.get('negociacoes/retrasada').then(dados => {
             resolve(dados.map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor)));
         }).catch((erro) => reject('Não foi possível obter as negociações da semana retrasada'));
       });
        
    }
    
    obterNegociacoesDoPeriodo() {
        
        return new Promise((resolve, reject) => {
            
            Promise.all([
                this.obterNegociacoesDaSemana(),
                this.obterNegociacoesDaSemanaAnterior(),
                this.obterNegociacoesDaSemanaRetrasada()
            ])
            .then(negociacoesPorPeriodo => {
                
                resolve(negociacoesPorPeriodo.reduce((grupoAtual, proximoGrupo) => {
                    return grupoAtual.concat(proximoGrupo);
                })); 
            })
            .catch((erro) => reject(erro));             
        });  
    }
}

NegociacaoService.inject = ['HttpService'];