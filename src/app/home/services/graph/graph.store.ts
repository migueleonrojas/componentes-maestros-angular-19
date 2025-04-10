
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
      addValueGraph: ( resultGraph: ResultGraph) => {
         patchState(store, (state) => ({
            ...state,
            results: [...state.results, resultGraph]
            
         }));
      }
   }))
)