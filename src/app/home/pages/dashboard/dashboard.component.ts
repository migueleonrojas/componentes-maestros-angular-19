import { Component } from '@angular/core';
import { MenuSlideComponent } from '../../components/menu-slide/menu-slide.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

@Component({
   selector: 'app-dashboard',
   imports: [
    RouterOutlet,
    MatSidenavModule,
    NavBarComponent,
    MenuSlideComponent
],
   templateUrl: './dashboard.component.html',
   styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
