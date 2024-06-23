import { FC, Suspense, lazy, useState } from 'react';

import ChatForm from '@components/ChatForm/ChatForm';
import ChatHeader from '@components/ChatHeader/ChatHeader';
import LoaderUIActions from '@components/LoaderUIActions/LoaderUIActions';
import Messages from '@components/Messages/Messages';

import useResizeWindow from '@hooks/useResizeWindow';

const SearchMessages = lazy(
  () => import('@components/ChatHeader/SearchMessages/SearchMessages')
);

const ChatPage: FC = () => {
  const [isShowSearchMessages, setIsShowSearchMessages] = useState(false);

  const { heightWindow } = useResizeWindow();

  return (
    <>
      <div
        className="relative w-full overflow-hidden bg-transparent xl:flex xl:flex-col xl:items-center"
        style={{
          height: heightWindow,
        }}
      >
        <ChatHeader setIsShowSearchMessages={setIsShowSearchMessages} />

        <Messages />

        <ChatForm isShowSearchMessages={isShowSearchMessages} />
      </div>
      {isShowSearchMessages && (
        <div className="absolute right-0 top-0 z-10 h-full w-2/3 border-l border-ultraDarkZinc bg-main p-2 dark:bg-mainBlack md:w-2/4">
          <Suspense fallback={<LoaderUIActions size={50} />}>
            <SearchMessages setIsShowSearchMessages={setIsShowSearchMessages} />
          </Suspense>
        </div>
      )}
    </>
  );
};

export default ChatPage;
