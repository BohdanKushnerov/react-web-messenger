import type { GroupedMessages } from '../types/GroupedMessages';

export interface IButtonEditProps {
  groupedMessages: GroupedMessages | null;
  textContent?: boolean;
  color: string;
}
