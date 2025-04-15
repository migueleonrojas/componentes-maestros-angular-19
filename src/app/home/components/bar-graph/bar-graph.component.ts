import {  Component, inject, input, linkedSignal, output } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { GraphStore } from '../../services/graph/graph.store';

import { ResultGraph } from '../../../core/models/graph-state.model';
import { LegendComponent } from '../legend/legend.component';

@Component({
   selector: 'app-bar-graph',
   imports: [ NgxChartsModule, LegendComponent ],
   templateUrl: './bar-graph.component.html',
   styleUrl: './bar-graph.component.scss',
})
export class BarGraphComponent {

  

   graphs = input.required<ResultGraph[]>();

   graphsLegend = input.required<ResultGraph[]>();

   filter = output<ResultGraph>();

   removeFilter = output<ResultGraph>();
   
   view: [number, number]= [500, 450];

   colorScheme = linkedSignal<Color>(() => ({
      domain: this.graphs().map(r => r.domain),
      group: ScaleType.Ordinal,
      selectable: true,
      name: 'Gráfica de Barras.'
   }));

  

   onSelect(event: unknown) {
      
      let resultGraph;

      if(typeof event  === 'string') {
         resultGraph = (this.graphs().filter(g => g.name === event))[0];
      }

      else if(typeof event === 'object') {
         let filterResultGraph = event as ResultGraph;
         resultGraph = (this.graphs().filter(g => g.name === filterResultGraph.name))[0];
      }

      this.filter.emit(resultGraph!);

   }

   onRemove(resultGraph:ResultGraph) {
      this.removeFilter.emit(resultGraph);
   }

}
