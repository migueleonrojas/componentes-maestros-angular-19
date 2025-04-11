import {  Component, inject, linkedSignal } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { GraphStore } from '../../services/graph/graph.store';
import { ResultGraph } from '../../../core/models/graph-state.model';

@Component({
   selector: 'app-bar-graph',
   imports: [ NgxChartsModule ],
   templateUrl: './bar-graph.component.html',
   styleUrl: './bar-graph.component.scss',
})
export class BarGraphComponent {

   graphStore = inject(GraphStore);
   
   view: [number, number]= [500, 450];

   single = linkedSignal(() => this.graphStore.results());  

   colorScheme: Color = { 
      domain: this.graphStore.results().map(r => `${r.domain}`), 
      group: ScaleType.Linear, 
      selectable: true, 
      name: 'Customer Usage', 
  };

   onSelect(event: Event) {
      
   }

}
