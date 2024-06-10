import { Dispatch, SetStateAction } from 'react';

import { IGroupedMessages } from '@interfaces/IGroupedMessages';

export type UseChatMessageUpdates = (
  chatUID: string | null,
  setGroupedMessages: Dispatch<SetStateAction<IGroupedMessages | null>>
) => void;
