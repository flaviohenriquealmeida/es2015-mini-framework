class Bind {
    
    constructor(model, view, ...props) {
        
       var proxy = ProxyFactory.create(model, props, model => {
           view.update(model)
       });
        
       view.update(model);
       return proxy;
    }
}