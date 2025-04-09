import { BarGraphState } from "../../../core/models/bar-graph-state.model";
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals'

const initialState: BarGraphState = {
   xAxisLabel: '',
   yAxisLabel: '',
   colorScheme: [],
   results: []
}

export const BarGraphStore = signalStore(
   { providedIn: 'root' },
   withState(initialState),
   withMethods( store => ({
      
   }))
)