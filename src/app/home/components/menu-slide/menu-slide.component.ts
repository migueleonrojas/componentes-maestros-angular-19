import { Component, inject, input, linkedSignal, signal } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDrawer } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {  RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-menu-slide',
  imports: [ 
      MatDividerModule, 
      MatListModule, 
      MatIconModule, 
      MatButtonModule, 
      RouterLink, 
      NgClass,
      RouterLinkActive
  ],
  templateUrl: './menu-slide.component.html',
  styleUrl: './menu-slide.component.scss'
})
export class MenuSlideComponent {

   matDrawer = input.required<MatDrawer>();

   


   closeSideMenu() {
      this.matDrawer().toggle();
   }


}


