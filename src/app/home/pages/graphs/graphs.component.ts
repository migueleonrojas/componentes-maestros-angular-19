import { Component, inject, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { BarGraphComponent } from '../../components/bar-graph/bar-graph.component';
import { GraphStore } from '../../services/graph/graph.store';
import { ResultGraph } from '../../../core/models/graph-state.model';
import { LinearGraphComponent } from "../../components/linear-graph/linear-graph.component";
import { CircleGraphComponent } from '../../components/circle-graph/circle-graph.component';


@Component({
  selector: 'app-graphs',
  imports: [
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    BarGraphComponent,
    LinearGraphComponent,
    CircleGraphComponent
],
  templateUrl: './graphs.component.html',
  styleUrl: './graphs.component.scss'
})
export class GraphsComponent {
   
   graphStore = inject(GraphStore);

   filterResultGraphs(resultGraph: ResultGraph) {

      this.graphStore.addFilteredValueGraph(resultGraph);
   }

   removeFilterResultGraphs(resultGraph: ResultGraph) {
      this.graphStore.removeFilteredValueGraph(resultGraph);
   }

}


