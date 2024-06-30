export interface IMessageChatForm {
  message: string;
  setMessage: (msg: string | ((prev: string) => string)) => void;
}
