export interface ISearchInputProps {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholderText: string;
  autoFocus: boolean;
}
