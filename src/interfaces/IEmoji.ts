export interface IEmoji {
  setMessage(updateFunction: (prev: string) => string): void;
}