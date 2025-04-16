import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals'
import { GraphState, ResultGraph } from '../../../core/models/graph-state.model'
import { pipe, switchMap } from 'rxjs';
import { inject, computed, effect } from '@angular/core';
import { GraphService } from './graph.service';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { getDifferentElements } from '../../../shared/utils/arrays';

const initialState: GraphState = {
  
   results: [],
   filteredResults: []
}

export const GraphStore = signalStore(
   { providedIn: 'root' },
   withState(initialState),
   withComputed(({ results, filteredResults }) => ({
      resultFilterDifferent: computed(() => {

         const resultsLocal = results();
         const filteredResultsLocal = filteredResults();

         return getDifferentElements(resultsLocal, filteredResultsLocal);
      })
   })),

   withMethods( (store, graphService = inject(GraphService)) => ({
      
      loadResultGraphs: rxMethod<void>(
         pipe(
            switchMap(() => graphService.getValuesGraphs().pipe(
               tapResponse({
                  next: ( resultGraph: ResultGraph[] ) => {
                     patchState(store, (state) => ({
                        ...state,
                        results: resultGraph
                     }));
                  },
                  error: () => {

                  }
               })

            ))
         )
      ),
      loadFilteredResultGraphs: rxMethod<void>(
         pipe(
            switchMap(() => graphService.getValuesGraphsFiltered().pipe(
               tapResponse({
                  next: ( resultFilteredGraph: ResultGraph[] ) => {
                     patchState(store, (state) => ({
                        ...state,
                        filteredResults: resultFilteredGraph
                     }));
                  },
                  error: () => {

                  }
               })

            ))
         )
      ),
      getValueGraph: (id: number) =>  {

         const getValueGraphById = ( store.results().filter(result => result.id === id) )[0];

         return getValueGraphById;

      },
      addValueGraph: (resultGraph: ResultGraph) => {
         patchState(store, (state) => ({
            ...state,
            results: [...state.results, resultGraph]
            
         }));
         graphService.setValuesGraphs(store.results());

      },
      
      updateValueGraph: (resultGraph: ResultGraph) => {

         const resultAfterUpdate = store.results().map((result) => {
            if(result.id === resultGraph.id) {
               return resultGraph
            }
            else{
               return result
            }
         });

         const resultFilterAfterUpdate = store.filteredResults().map((result) => {
            if(result.id === resultGraph.id) {
               return resultGraph
            }
            else{
               return result
            }
         });


         patchState(store, (state) => ({
            ...state,
            results: resultAfterUpdate,
            filteredResults: resultFilterAfterUpdate
         }));

         graphService.setValuesGraphs(store.results());
         graphService.setValuesGraphsFiltered(store.filteredResults());

      },
      deleteValueGraph: (idParam: number) => {

         const resultAfterElimination = store.results().filter((result) => result.id !== idParam );
         const resultFilterAfterElimination = store.filteredResults().filter((filterResult) => filterResult.id !== idParam );

         patchState(store, (state) => ({
            ...state,
            results: resultAfterElimination,
            filteredResults: resultFilterAfterElimination
         }));

         graphService.setValuesGraphs(store.results());
         graphService.setValuesGraphsFiltered(store.filteredResults());

      },
      addFilteredValueGraph: (resultGraph: ResultGraph) => {

         const coincidences = store.filteredResults().filter(resultGraphFilter => resultGraphFilter.id === resultGraph.id)


         if(coincidences.length > 0) return;


         if( ( store.results().length - store.filteredResults().length ) === 1) return;

         patchState(store, (state) => ({
            ...state,
            filteredResults: [...state.filteredResults, resultGraph]
         }));

         graphService.setValuesGraphsFiltered(store.filteredResults());

      },
      removeFilteredValueGraph: (resultGraph: ResultGraph) => {

         const newsFilteredResults =  store.filteredResults().filter(filtered => filtered.id !== resultGraph.id);

         patchState(store, (state) => ({
            ...state,
            filteredResults: newsFilteredResults
         }));

         graphService.setValuesGraphsFiltered(store.filteredResults());

      }
   })),
   withHooks({
      onInit: (store) => {
         store.loadResultGraphs();
         store.loadFilteredResultGraphs();
      }
   })
)

