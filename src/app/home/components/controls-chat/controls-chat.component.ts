import { Component, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Message, Sender, Content, TypeContent } from '../../../core/models/chat-state.model';

@Component({
  selector: 'app-controls-chat',
  imports: [ MatIconModule, MatButtonModule, FormsModule ],
  templateUrl: './controls-chat.component.html',
  styleUrl: './controls-chat.component.scss',
  standalone: true
})
export class ControlsChatComponent {

   inputVal = signal<string>('');

   newMessage = output<Message>();

   sendMessage(newMessage: string, $event: Event) {

      $event.preventDefault();
      const message = (newMessage).trim().toLocaleLowerCase();


      if(message === '') return;

      this.newMessage.emit({
         content: {
            type: TypeContent.TEXT,
            text: message
         },
         id: '',
         sender: Sender.USER,
         idSender: '',
         date: new Date()
      })


      this.inputVal.set('');

   }

}
