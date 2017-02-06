class DateHelper {
    
    static dataParaTexto(data) {
         
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`        
    }
    
    static textoParaData(anoMesDia) {
        
        return new Date(...
                anoMesDia.split('-')
                .map((item, indice) => item - indice % 2));                 
    }
}