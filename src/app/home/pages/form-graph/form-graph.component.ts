import { Component, inject, OnInit } from '@angular/core';
import { FormComponent } from "../../components/form/form.component";
import { NavBarService } from '../../services/nav-bar/nav-bar.service';
import { ResultGraph } from '../../../core/models/graph-state.model';
import { GraphStore } from '../../services/graph/graph.store';
import { CardValueComponent } from "../../components/card-value/card-value.component";

@Component({
  selector: 'app-form-graph',
  imports: [FormComponent, CardValueComponent],
  templateUrl: './form-graph.component.html',
  styleUrl: './form-graph.component.scss'
})
export class FormGraphComponent implements OnInit {

   private navBarService = inject(NavBarService);
   
   graphStore = inject(GraphStore);
   
   
   ngOnInit(): void {
      this.navBarService.setBreakPoint('(min-width: 45rem)');
   }

   addingResultGraph(resultGraph: ResultGraph) {

      this.graphStore.addValueGraph(resultGraph);
   }


}
