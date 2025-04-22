
export enum TypeContent {
   TEXT,
   IMG
}

export interface Content {
   text: string
   type: TypeContent
}

export enum Sender {
   USER,
   SUPPORT
}

export interface Message {
   id: string,
   content: Content,
   sender: Sender,
   idSender: string
   date: Date
}

export type ChatState = {

   messages: Message[]

}