import { Component, ElementRef, inject, input } from '@angular/core';
import { Message, Sender } from '../../../core/models/chat-state.model';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-messages',
  imports: [ NgClass, DatePipe ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {

   elRef = inject(ElementRef);

   get scrollContainer() {
      return this.elRef.nativeElement;
   }   

   messages = input.required<Message[]>();

   sender = Sender;

   

}
