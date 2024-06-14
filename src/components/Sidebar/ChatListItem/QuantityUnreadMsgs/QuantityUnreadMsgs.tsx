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
        <p className="flex justify-center items-center p-1 px-3 border border-white text-white rounded-full shadow-mainShadow bg-veryDarkGray">
          {lengthOfMyUnreadMsgs}
        </p>
      )}
    </>
  );
};

export default QuantityUnreadMsgs;
