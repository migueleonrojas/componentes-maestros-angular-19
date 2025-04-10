
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals'
import { GraphState, ResultGraph } from '../../../core/models/graph-state.model'

const initialState: GraphState = {
   xAxisLabel: '',
   yAxisLabel: '',
   colorScheme: [],
   results: []
}

export const GraphStore = signalStore(
   { providedIn: 'root' },
   withState(initialState),
   withMethods( store => ({
      getValueGraph: (id: number) =>  {

         const getValueGraphById = ( store.results().filter(result => result.id === id) )[0];

         return getValueGraphById;

      },
      addValueGraph: ( resultGraph: ResultGraph) => {
         patchState(store, (state) => ({
            ...state,
            results: [...state.results, resultGraph]
            
         }));
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

         patchState(store, (state) => ({
            ...state,
            results: resultAfterUpdate
         }))



      },
      deleteValueGraph: (idParam: number) => {

         const resultAfterElimination = store.results().filter((result) => result.id !== idParam );

         patchState(store, (state) => ({
            ...state,
            results: resultAfterElimination
         }))

      }
   }))
)