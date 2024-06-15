import { IGroupedMessages } from './IGroupedMessages';

export interface IButtonEditProps {
  groupedMessages: IGroupedMessages | null;
  textContent?: boolean;
  color: string;
}
