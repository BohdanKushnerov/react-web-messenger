import { Dispatch, SetStateAction } from 'react';

import { IGroupedMessages } from '@interfaces/IGroupedMessages';

export type UseChatMessageUpdates = (
  setGroupedMessages: Dispatch<SetStateAction<IGroupedMessages | null>>
) => void;
