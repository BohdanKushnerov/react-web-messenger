import { FC } from 'react';

import useLengthOfMyUnreadMsgs from '@hooks/useLengthOfMyUnreadMsgs';
import useUnreadMessagesInChatListItem from '@hooks/useUnreadMessages';
import { IQuantityUnreadMsgsProps } from '@interfaces/IQuantityUnreadMsgsProps';

const QuantityUnreadMsgs: FC<IQuantityUnreadMsgsProps> = ({ chatInfo }) => {
  const lengthOfMyUnreadMsgs = useLengthOfMyUnreadMsgs(chatInfo);
  useUnreadMessagesInChatListItem(lengthOfMyUnreadMsgs, chatInfo);

  return (
    <>
      {lengthOfMyUnreadMsgs > 0 && (
        <p className="flex justify-center items-center p-1 px-3 border border-white text-white rounded-full shadow-mainShadow bg-gray-500">
          {lengthOfMyUnreadMsgs}
        </p>
      )}
    </>
  );
};

export default QuantityUnreadMsgs;
