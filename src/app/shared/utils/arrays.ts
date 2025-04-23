import { PossibleAnswers } from '../../core/models/possible-answers.interface';
import { PossibleAnswer } from '../../core/models/possible-answer.model';
import { normalizeText } from './text';


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


export const getAnswer = (question: string, answers: string []): string => {
    
   let possiblesAnswers: PossibleAnswer[] = [];
   
   let coincidences = 0;
   
   for(let i = 0; i < answers.length; i++) {
       
       coincidences = 0;
       
       let questionNormalizeArray = normalizeText(question).split(' ');
       let answerNormalizeArray = normalizeText(answers[i]).split(' ');
       
       for(let j = 0; j < questionNormalizeArray.length; j++) {

           for(let k = 0; k < answerNormalizeArray.length; k++) {
                     
               if(
                   answerNormalizeArray[k].includes(questionNormalizeArray[j])
               ){
                   
                   coincidences++;
               }

           }

       }
       
       possiblesAnswers.push({
           text: answers[i],
           coincidences
       })
       
       
   }

   
   return possiblesAnswers.sort((a, b) => b.coincidences - a.coincidences )[0].text;
   
}