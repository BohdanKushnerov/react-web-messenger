import { FC, Suspense, lazy, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonSearchMessages from '@components/Buttons/ButtonSearchMessages/ButtonSearchMessages';
import ChatHeaderOponentInfo from '@components/ChatHeader/ChatHeaderOponentInfo/ChatHeaderOponentInfo';
import LoaderUIActions from '@components/LoaderUIActions/LoaderUIActions';

import useChatStore from '@zustand/store';

import useResizeWindow from '@hooks/useResizeWindow';

import { IChatHeaderProps } from '@interfaces/IChatHeaderProps';

const ButtonArrow = lazy(
  () => import('@components/Buttons/ButtonArrow/ButtonArrow')
);

const ChatHeader: FC<IChatHeaderProps> = ({ setIsShowSearchMessages }) => {
  const navigate = useNavigate();

  const { chatUID } = useChatStore(state => state.currentChatInfo);
  const resetCurrentChatInfo = useChatStore(
    state => state.resetCurrentChatInfo
  );

  const { isFullScreen } = useResizeWindow();

  useEffect(() => {
    setIsShowSearchMessages(false);
  }, [chatUID, setIsShowSearchMessages]);

  const handleClickShowSearchMessages = () => {
    setIsShowSearchMessages(true);
  };

  const handleClickNavigateToSidebarScreen = () => {
    resetCurrentChatInfo();
    navigate('/');
  };

  return (
    <div className="absolute left-0 top-0 z-10 flex h-14 w-full items-center gap-4 bg-main px-6 shadow-bottomShadow dark:bg-mainBlack">
      {!isFullScreen && (
        <Suspense
          fallback={
            <div>
              <LoaderUIActions size={40} />
            </div>
          }
        >
          <ButtonArrow
            handleClickButtonArrow={handleClickNavigateToSidebarScreen}
          />
        </Suspense>
      )}

      <ChatHeaderOponentInfo />

      <ButtonSearchMessages handleClick={handleClickShowSearchMessages} />
    </div>
  );
};

export default ChatHeader;
