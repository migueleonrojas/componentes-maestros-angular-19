import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


   setData<T extends object>(key: string, data: T){

      localStorage.setItem(key, JSON.stringify(data));

   }

   getData<T>(key: string): T {

      return JSON.parse(localStorage.getItem(key)!);

   }
  

}
