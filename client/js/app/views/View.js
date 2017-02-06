class View {
        
    constructor(elemento) {
        
        this._elemento = elemento;
    }
    
    template(object) {
        
        throw new Error('Você deve sobrescrever este método com seu template');
    }
    
    update(model) {   
        
        this._elemento.innerHTML = this.template(model); 
    }
}