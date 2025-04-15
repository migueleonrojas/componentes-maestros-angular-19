import { Component, input, linkedSignal, output } from '@angular/core';
import { ResultGraph } from '../../../core/models/graph-state.model';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { LegendComponent } from '../legend/legend.component';

@Component({
  selector: 'app-circle-graph',
  imports: [ NgxChartsModule, LegendComponent ],
  templateUrl: './circle-graph.component.html',
  styleUrl: './circle-graph.component.scss'
})
export class CircleGraphComponent {
   graphs = input.required<ResultGraph[]>();

   graphsLegend = input.required<ResultGraph[]>();

   filter = output<ResultGraph>();

   removeFilter = output<ResultGraph>();
   
   view: [number, number]= [500, 450];

   colorScheme = linkedSignal<Color>(() => ({
      domain: this.graphs().map(r => r.domain),
      group: ScaleType.Ordinal,
      selectable: true,
      name: 'Gráfica de Circulos.'
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
