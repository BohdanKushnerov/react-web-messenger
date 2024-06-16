import { FC } from 'react';

import useLengthOfMyUnreadMsgs from '@hooks/useLengthOfMyUnreadMsgs';
import useUnreadMessagesInChatListItem from '@hooks/useUnreadMessages';

import { IQuantityUnreadMsgsProps } from '@interfaces/IQuantityUnreadMsgsProps';

const QuantityUnreadMsgs: FC<IQuantityUnreadMsgsProps> = ({ chatUID }) => {
  const lengthOfMyUnreadMsgs = useLengthOfMyUnreadMsgs(chatUID);
  useUnreadMessagesInChatListItem(lengthOfMyUnreadMsgs, chatUID);

  return (
    <>
      {lengthOfMyUnreadMsgs > 0 && (
        <p className="flex items-center justify-center rounded-full border border-white bg-veryDarkGray p-1 px-3 text-white shadow-mainShadow">
          {lengthOfMyUnreadMsgs}
        </p>
      )}
    </>
  );
};

export default QuantityUnreadMsgs;
