import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export const valueIncludedInArrayObject = <T extends object>(
   property: keyof T,
   arrayOfObjets: T[]
): ValidatorFn => {
   return (control: AbstractControl): ValidationErrors | null => {

      if (!control.value || arrayOfObjets.length === 0) {
         return null;
      }

      let value = control.value.toLowerCase();

      let coincidences = arrayOfObjets.filter(object => (object[property] as string).toLowerCase() === value);

      return coincidences.length < 1 ? null : { 'valueIncludeInArray': true };
      
   };
 }