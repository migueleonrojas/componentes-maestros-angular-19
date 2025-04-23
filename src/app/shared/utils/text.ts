export const normalizeText = (text:string):string => {
    
   return text.normalize('NFD').replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ ]+/g, '').toLowerCase();
   
}