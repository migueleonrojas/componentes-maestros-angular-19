import levenshtein from 'fast-levenshtein';
import { PossibleAnswers } from '../../core/models/possible-answers.interface';


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

export const getAnswer = (answers: ReadonlyArray<string>, message:string): string => {

   const possibleAnswers: PossibleAnswers[] = [];

   for(let i = 0; i < message.split(' ').length; i++) {

      let coincidencesInclude = 0;

      for(let j = 0; j < answers.length; j++) {

         if(answers[j].toLowerCase().replace(',', ' ').includes(message.split(' ')[i])) {
            coincidencesInclude ++;
            possibleAnswers.push({
               coincidencesScore: coincidencesInclude * message.split(' ')[i].length,
               textAnswer: answers[j]
            })
         }
         else {
            possibleAnswers.push({
               coincidencesScore: 0,
               textAnswer: answers[j]
            })
         }
         
      } 

   }
   
   const answer = possibleAnswers.reduce((prev, current) => current.coincidencesScore > prev.coincidencesScore ? current: prev);

   return answer.textAnswer;

}