import { FC, Suspense, lazy, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ChatForm from '../ChatForm/ChatForm';
import ChatHeader from '../ChatHeader/ChatHeader';
import MessageList from '@components/Messages/MessageList/MessageList';
const SearchMessages = lazy(
  () => import('@components/ChatHeader/SearchMessages/SearchMessages')
);
import useChatStore from '@zustand/store';
import '@i18n';
import LoaderUIActions from '@components/LoaderUIActions/LoaderUIActions';

const Chat: FC = memo(() => {
  const [isShowSearchMessages, setIsShowSearchMessages] = useState(false);
  const { t } = useTranslation();

  const { chatUID } = useChatStore(state => state.currentChatInfo);

  console.log('screen --> Chat');

  return (
    <>
      <div className="relative h-full w-screen xl:flex xl:flex-col xl:items-center bg-transparent overflow-hidden">
        {chatUID ? (
          <>
            <ChatHeader setIsShowSearchMessages={setIsShowSearchMessages} />

            <MessageList />

            <ChatForm />
          </>
        ) : (
          <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-gray-700 rounded-xl text-center text-white font-black">
            {t('EmptyChatNofify')}
          </h2>
        )}
      </div>
      {isShowSearchMessages && (
        <div className="absolute top-0 right-0 z-10 md:static md:z-0 w-2/3 md:w-2/4 p-2 h-full border-l border-zinc-800 bg-gray-200 dark:bg-myBlackBcg">
          <Suspense fallback={<LoaderUIActions size={50} />}>
            <SearchMessages setIsShowSearchMessages={setIsShowSearchMessages} />
          </Suspense>
        </div>
      )}
    </>
  );
});

export default Chat;
