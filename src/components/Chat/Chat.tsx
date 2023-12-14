import { FC, useState } from 'react';

import MessageList from '@components/MessageList/MessageList';
import SearchMessages from '@components/SearchMessages/SearchMessages';
import ChatForm from '../ChatForm/ChatForm';
import ChatHeader from '../ChatHeader/ChatHeader';
import useChatStore from '@zustand/store';
import '@i18n';

const Chat: FC = () => {
  const [isShowSearchMessages, setIsShowSearchMessages] = useState(false);

  const { chatUID } = useChatStore(state => state.currentChatInfo);

  console.log('screen --> Chat');

  return (
    <>
      <div className="relative h-full w-screen xl:flex xl:flex-col xl:items-center bg-transparent overflow-hidden">
        {chatUID && (
          <>
            <ChatHeader setIsShowSearchMessages={setIsShowSearchMessages} />

            <MessageList />

            <ChatForm />
          </>
        )}
      </div>
      {isShowSearchMessages && (
        <div className="absolute top-0 right-0 z-10 md:static md:z-0 w-2/3 md:w-2/4 p-2 h-full border-l border-zinc-800 bg-gray-200 dark:bg-myBlackBcg">
          <SearchMessages setIsShowSearchMessages={setIsShowSearchMessages} />
        </div>
      )}
    </>
  );
};

export default Chat;
