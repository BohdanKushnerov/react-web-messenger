import type { FC } from 'react';

import useUnreadMessagesInChatListItem from '@hooks/sidebar/useUnreadMessages';
import useLengthOfMyUnreadMessages from '@hooks/useLengthOfMyUnreadMessages';

interface IQuantityUnreadMessagesProps {
  chatUID: string;
}

const QuantityUnreadMessages: FC<IQuantityUnreadMessagesProps> = ({
  chatUID,
}) => {
  const lengthOfMyUnreadMessages = useLengthOfMyUnreadMessages(chatUID);
  useUnreadMessagesInChatListItem(lengthOfMyUnreadMessages, chatUID);

  return (
    <>
      {lengthOfMyUnreadMessages > 0 && (
        <p className="flex items-center justify-center rounded-full border border-white bg-veryDarkGray p-1 px-3 text-white shadow-mainShadow">
          {lengthOfMyUnreadMessages}
        </p>
      )}
    </>
  );
};

export default QuantityUnreadMessages;
