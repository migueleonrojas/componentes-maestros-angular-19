import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { ChatState, Message } from "../../../core/models/chat-state.model";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { tapResponse } from "@ngrx/operators";
import { inject } from "@angular/core";
import { ChatService } from "./chat.service";

const initialState: ChatState = {
   messages: []
}

export const ChatStore = signalStore(
   { providedIn: 'root' },
   withState(initialState),
   withMethods((store,  chatService = inject(ChatService)) => ({
      loadMessages: rxMethod<void>(
         pipe(
            switchMap(() => chatService.getAllMessages().pipe(
               tapResponse({
                  next: ( allMessages: Message[] ) => {
                     patchState(store, (state) => ({
                        ...state,
                        messages: [...allMessages]
                     }));
                  },
                  error: () => {

                  }
               })

            ))
         )
      ),
      supportResponse: rxMethod<string>(
         pipe(
            switchMap((msg: string) => chatService.generateMessageFromSupport(msg).pipe(
               tapResponse({
                  next: ( message: Message | null ) => {
                     if(message === null) return;
                     patchState(store, (state) => ({
                        ...state,
                        messages: [...state.messages, message]
                     }));
                  },
                  error: () => {

                  }
               })

            ))
         )
      ),
      addMessage: (messageParam: Message) => {
         patchState(store, (state) => ({
            ...state,
            messages: [...state.messages, messageParam]
         }));         
      }
   })),
   withHooks({
      onInit: (store) => {
         store.loadMessages(); 
      }
   })
)