export interface IChatFormProps {
  message: string;
  // setMessage: (value: string) => void;
  setMessage(updateFunction: (prev: string) => string): void;
  handleChangeMessage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleManageSendMessage: (e: React.FormEvent) => void;
}