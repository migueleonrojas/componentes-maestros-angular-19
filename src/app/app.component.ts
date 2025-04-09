import { Component } from '@angular/core';
import { DashboardComponent } from './home/pages/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  imports: [DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'components-master-angular-19';
}
