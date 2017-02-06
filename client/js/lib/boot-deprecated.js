document.addEventListener('DOMContentLoaded', function() {
    
   function capitalizeFirstLetter(string) {
            return string.charAt(0).toLowerCase() + string.slice(1);
   }
   
   var nodeList = document.querySelectorAll('[alura-controller]');
   
   [].forEach.call(nodeList, function(node) {
           
           let claz = node.dataset.controller;
         
           let clazAsString = window.classes[claz].toString();
           
           let depsString = clazAsString.match(/\[.*\]/)[0].replace(/'/g, '"');
           
           let deps = JSON.parse(depsString);
           
           let elements = [];
           
           deps.forEach(function(dep) {
               elements.push(document.querySelector(dep));
           })
 
           window[capitalizeFirstLetter(claz)] = new window.classes[claz](...elements);
         
   
    
});


/*
function capitalizeFirstLetter(string) {
            return string.charAt(0).toLowerCase() + string.slice(1);
   }
   
   var nodeList = document.querySelectorAll('[data-controller]');
   
        [].forEach.call(nodeList, function(node) {
           
           let claz = node.dataset.controller;
         
           let clazAsString = window.classes[claz].toString();
           
           let depsString = clazAsString.match(/\[.*\]/)[0].replace(/'/g, '"');
           
           let deps = JSON.parse(depsString);
           
           let elements = [];
           
           deps.forEach(function(dep) {
               elements.push(document.querySelector(dep));
           })
 
           window[capitalizeFirstLetter(claz)] = new window.classes[claz](...elements);
         
           
   });

*/
/*

document.addEventListener('DOMContentLoaded', function() {
    
  function capitalizeFirstLetter(string) {
            return string.charAt(0).toLowerCase() + string.slice(1);
   }
   
   var nodeList = document.querySelectorAll('[data-controller]');
   
        [].forEach.call(nodeList, function(node) {
           let controller = node.dataset.controller;
           window[capitalizeFirstLetter(controller)] = new window.classes[controller];
   });
   
   
    // transforma a função em string
    let classString = window.classes.AppController.toString();
    let depString = classString.match(/\[.*\]/)[0].replace(/'/g, '"');
    let depArray = JSON.parse(depString);
    console.log(depArray);
    
    
});
*/