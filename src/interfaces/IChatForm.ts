export interface IChatForm {
  message: string;
  handleChangeMessage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleManageSendMessage: (e: React.FormEvent) => void;
}