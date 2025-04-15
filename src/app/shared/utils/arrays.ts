export const getDifferentElements = <T extends Record<string, any>>(
   firstArray: T[],
   secondArray: T[]
 ): T[] => {
   return firstArray.filter(firstElem => {
      
     return !secondArray.some(secondElem => {

       const keysFirst = Object.keys(firstElem);
       const keysSecond = Object.keys(secondElem);
 
       if (keysFirst.length !== keysSecond.length) {
         return false;
       }
 
       return keysFirst.every(key => firstElem[key] === secondElem[key]);
     });
   });
 };