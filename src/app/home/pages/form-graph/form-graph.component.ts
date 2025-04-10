import { Component, inject, OnInit, signal } from '@angular/core';
import { FormComponent } from "../../components/form/form.component";
import { NavBarService } from '../../services/nav-bar/nav-bar.service';
import { ResultGraph } from '../../../core/models/graph-state.model';
import { GraphStore } from '../../services/graph/graph.store';
import { CardValueComponent } from "../../components/card-value/card-value.component";
import { Sweetalert2Service } from '../../../shared/service/sweetalert2/sweetalert2.service';

@Component({
  selector: 'app-form-graph',
  imports: [FormComponent, CardValueComponent],
  templateUrl: './form-graph.component.html',
  styleUrl: './form-graph.component.scss'
})
export class FormGraphComponent implements OnInit {

   private sweetalert2Service = inject(Sweetalert2Service);

   private navBarService = inject(NavBarService);
   
   graphStore = inject(GraphStore);

   resultGraphToEdit = signal<ResultGraph | undefined>(undefined);
   
   
   ngOnInit(): void {
      this.navBarService.setBreakPoint('(min-width: 45rem)');
   }

   addingResultGraph(resultGraph: ResultGraph) {

      this.graphStore.addValueGraph(resultGraph);
   }

   editResultGraph(id: number) {

      this.resultGraphToEdit.set(this.graphStore.getValueGraph(id));
   }


   async confirmEditResultGraph(resultGraph: ResultGraph) {

      if( ! await this.sweetalert2Service.confirmAction('¿Desea editar este valor de la gráfica?')) return;

      this.graphStore.updateValueGraph(resultGraph);
      
      this.resultGraphToEdit.set(undefined);
   }

   async cancelEditResultGraph() {

      if( ! await this.sweetalert2Service.confirmAction('¿Desea cancelar la edición de este valor de la gráfica?')) return

      this.resultGraphToEdit.set(undefined);
   }

   async deleteResultGraph(id: number) {
      
      if( ! await this.sweetalert2Service.confirmAction('¿Desea eliminar este valor para la gráfica?')) return;

      this.graphStore.deleteValueGraph(id);

      if (this.resultGraphToEdit()?.id === id) {
         
         this.resultGraphToEdit.set(this.graphStore.getValueGraph(id));

      }

 
   }




}
