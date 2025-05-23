import { ValidatorFn } from "@angular/forms";

export interface ResultGraph {
   id: number;
   name: string;
   value: number;
   domain: string;
}

export interface ResultGraphForm  {
   name: (string | ValidatorFn[])[];
   value: (number | ValidatorFn[])[];
   domain: (string | ValidatorFn[])[];
   
}

export type GraphState = {
   results: ResultGraph[];
   filteredResults: ResultGraph[];
}