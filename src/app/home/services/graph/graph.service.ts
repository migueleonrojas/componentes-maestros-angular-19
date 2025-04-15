import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ResultGraph } from '../../../core/models/graph-state.model';
import { LocalStorageService } from '../../../shared/service/local-storage/local-storage.service';
import { RESULT_GRAPH_KEY, RESULT_GRAPH_KEY_FILTERED } from '../../../shared/constants/graphs.constants';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

   private localStorageService = inject(LocalStorageService);

   getValuesGraphs(): Observable<ResultGraph[]> {

      return of(this.localStorageService.getData(RESULT_GRAPH_KEY) || [] as ResultGraph[])

   }

   setValuesGraphs(resultGraph: ResultGraph[]): void {

      this.localStorageService.setData(RESULT_GRAPH_KEY, resultGraph);

   }



   getValuesGraphsFiltered(): Observable<ResultGraph[]> {

      return of(this.localStorageService.getData(RESULT_GRAPH_KEY_FILTERED) || [] as ResultGraph[])

   }

  
   setValuesGraphsFiltered(resultGraph: ResultGraph[]) {

      this.localStorageService.setData(RESULT_GRAPH_KEY_FILTERED, resultGraph);


   }



}