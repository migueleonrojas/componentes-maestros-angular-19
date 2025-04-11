import { Component, input, output } from '@angular/core';
import { ResultGraph } from '../../../core/models/graph-state.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-card-value',
  imports: [ MatIconModule, MatButtonModule ],
  templateUrl: './card-value.component.html',
  styleUrl: './card-value.component.scss'
})
export class CardValueComponent {

   editing = output<number>();

   deleting = output<number>();

   result = input.required<ResultGraph>();

   editResult() {
      this.editing.emit(this.result().id);
   }

   deleteResult() {
      this.deleting.emit(this.result().id);
   }

}
