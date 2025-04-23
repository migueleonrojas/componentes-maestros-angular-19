import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Message, Sender, TypeContent } from '../../../core/models/chat-state.model';
import { getAnswer } from '../../../shared/utils/arrays';
import { ALL_RESPONSES_SUPPORT } from '../../../shared/constants/chat.constants';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  getAllMessages(): Observable<Message[]> {

      return of([
         {
            id: new Date().getTime().toString(),
            content: {
               text: 'Buen día, ¿en que le puedo ayudar hoy?',
               type: TypeContent.TEXT
            },
            sender: Sender.SUPPORT,
            idSender: new Date().getTime().toString(),
            date: new Date()
         }
      ]).pipe(
         delay(1500)
      )

  }

  generateMessageFromSupport(message:string): Observable<Message| null> {


      if(message === '') return of();

      return of({
         id: new Date().getTime().toString(),
            content: {
               text: getAnswer(message, ALL_RESPONSES_SUPPORT),
               type: TypeContent.TEXT
            },
            sender: Sender.SUPPORT,
            idSender: new Date().getTime().toString(),
            date: new Date()
      }).pipe(
         delay(3000)
      )
  }

}
