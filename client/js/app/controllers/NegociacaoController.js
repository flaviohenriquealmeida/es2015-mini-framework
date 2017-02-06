class NegociacaoController {
   
    constructor(inputData, inputQuantidade, inputValor, 
        negociacoesView, mensagemView, negociacaoService) {
            
        this._inputData = inputData;
        this._inputQuantidade = inputQuantidade;
        this._inputValor = inputValor;
        
        this._listaNegociacoes = new Bind(
                new ListaNegociacoes(), 
                new NegociacoesView(negociacoesView), 
                'adiciona', 'esvazia', 'ordena', 'reverte');
                     
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView(mensagemView),
            'texto');
            
        this._ordenadoPor = '';
        
        this._negociacaoService = negociacaoService;
    }
    
    adiciona(event) {
        
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        this._limpaFormulario();
    }
    
    importaNegociacoes() {
        
        this._negociacaoService.obterNegociacoesDoPeriodo()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => {
                    this._listaNegociacoes.adiciona(new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor));
                    this._mensagem.texto = 'Negociações importadas com sucesso!';        
                }) 
            }).catch((erro) => this._mensagem.texto = erro);
    }
    
    ordena(coluna) {
        
        if(this._ordenadoPor == coluna) {
            this._listaNegociacoes.reverte();    
        } else {
            this._listaNegociacoes.ordena((p, s) => p[coluna] - s[coluna]);    
        }
        this._ordenadoPor = coluna;
    }
    
    _criaNegociacao() {
        
        return new Negociacao(
                DateHelper.textoParaData(this._inputData.value),
                this._inputQuantidade.value,
                this._inputValor.value);   
    }
    
    _limpaFormulario() {
        
        this._inputData.value = '';
        this._inputData.focus();
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0
    }
    
    apaga() {

        this._listaNegociacoes.esvazia();
        this._mensagem.texto = "Negociações removidas com sucesso";
    }
}

NegociacaoController.inject =['#data', '#quantidade', '#valor', '#negociacoesView', 
        '#mensagemView', 'NegociacaoService'];