export interface ISearchProps {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholderText: string;
}