export interface IAuthConfirmButtonProps {
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}
