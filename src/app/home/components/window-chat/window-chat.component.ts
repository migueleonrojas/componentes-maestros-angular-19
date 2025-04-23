import {  Component, effect, inject, viewChild } from '@angular/core';
import { MessagesComponent } from "../messages/messages.component";
import { ControlsChatComponent } from "../controls-chat/controls-chat.component";
import { ChatStore } from '../../services/chat/chat.store';
import { Message } from '../../../core/models/chat-state.model';

@Component({
  selector: 'app-window-chat',
  imports: [MessagesComponent, ControlsChatComponent],
  templateUrl: './window-chat.component.html',
  styleUrl: './window-chat.component.scss'
})
export class WindowChatComponent {

   chatStore = inject(ChatStore);
   messagesComponent = viewChild.required(MessagesComponent);


    constructor() {

      effect(() => {
         this.chatStore.messages();
         this.scrollChatToBottom();
      })

    }


   addNewMessage(newMessage: Message) {
      

      this.chatStore.addMessage(newMessage);

      this.chatStore.supportResponse(newMessage.content.text);

   }

   scrollChatToBottom() {
      const el = this.messagesComponent().scrollContainer as HTMLElement;
      
      setTimeout(
         () => {
            el.scrollIntoView({ behavior: "smooth", block: "end" }); 
         },
         0
      );

      
    }

}
