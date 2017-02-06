let Injector = (function() {

    let instancia = undefined;
    
    class Injector {
        
        constructor() {
         
            if(!instancia) {
                this._$ = document.querySelector.bind(document);
                this._deps = new Map();
                instancia = this;    
            }
            return instancia; 
        }
        
        registraClasse(classe) {
            this._deps.set(classe.name, classe);
            console.log(`[${classe.name}]: classe registrada`);    
        }

        registraInstancia(id, instancia) {
            this._deps.set(id, instancia);
            console.log(`[${id}]: instancia registrada`);
        }
        
        criarInstancia(classe) {
            console.log(`[${classe.name}]: verificando dependências para criação`)
            var deps = [];
            if(classe.inject) {   
                console.log(`[${classe.name}]: possui as dependências ${classe.inject.join(',')}`);
                console.log(`[${classe.name}]: resolvendo dependências`);
                deps = classe.inject.map(dep => this.buscaInstancia(dep));
                console.log(`[${classe.name}]: dependências resolvidas`)    
            } else {
                console.log(`[${classe.name}] NÃO possui dependências`);
            }
            var instancia = Reflect.construct(classe, deps);      
            console.log(`[${classe.name}]: criado com sucesso`);
            return instancia;
        }
        
        buscaInstancia(id) {
            var dep = this._deps.get(id) || this._$(id);
            if(!dep) throw new Error(`Dependência "${id}" não registrada`);            
            if(this._precisaInstanciar(dep)) {
                console.log(`[${id}]: precisa instanciar`);
                dep = this.criarInstancia(dep);   
            }
            return dep;
        }
        
        _precisaInstanciar(dep) {
            return dep.toString().startsWith('class');
        }
    }
   
    return Injector;
    
})();

