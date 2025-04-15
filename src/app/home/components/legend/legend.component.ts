import { Component, computed, input, output } from '@angular/core';
import { ResultGraph } from '../../../core/models/graph-state.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-legend',
  imports: [ NgClass ],
  templateUrl: './legend.component.html',
  styleUrl: './legend.component.scss'
})
export class LegendComponent {


   graph = input.required<ResultGraph>();
   graphFiltered = input.required<ResultGraph[]>();
   select = output<ResultGraph>();
   remove = output<ResultGraph>();

   isFiltered = computed(() => !this.graphFiltered().includes(this.graph()))

   selectFiltered(resultGraph:ResultGraph) {

      if(this.graphFiltered().includes(resultGraph)) {

         this.select.emit(resultGraph);
      }

      else {

         this.remove.emit(resultGraph);

      }
   }

}
