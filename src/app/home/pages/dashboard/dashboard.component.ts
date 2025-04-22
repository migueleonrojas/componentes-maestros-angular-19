import { Component, inject, linkedSignal, OnInit } from '@angular/core';
import { MenuSlideComponent } from '../../components/menu-slide/menu-slide.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { NavBarService } from '../../services/nav-bar/nav-bar.service';
import { NgClass } from '@angular/common';

@Component({
   selector: 'app-dashboard',
   imports: [
    RouterOutlet,
    MatSidenavModule,
    NavBarComponent,
    MenuSlideComponent,
    NgClass
],
   templateUrl: './dashboard.component.html',
   styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

   private navBarService = inject(NavBarService);

   matches = linkedSignal(this.navBarService.getBreakPointMatch());

   

}
