import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { BarGraphComponent } from '../../components/bar-graph/bar-graph.component';

@Component({
  selector: 'app-graphs',
  imports: [ 
   MatTabsModule,
   MatIconModule,
   MatButtonModule,
   RouterLink,
   BarGraphComponent
  ],
  templateUrl: './graphs.component.html',
  styleUrl: './graphs.component.scss'
})
export class GraphsComponent {

}
