import { FC, Suspense, lazy, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ChatHeaderOponentInfo from '@components/ChatHeader/ChatHeaderOponentInfo/ChatHeaderOponentInfo';
import LoaderUIActions from '@components/LoaderUIActions/LoaderUIActions';
import ButtonSearchMessages from '@components/Buttons/ButtonSearchMessages/ButtonSearchMessages';
const ButtonArrow = lazy(
  () => import('@components/Buttons/ButtonArrow/ButtonArrow')
);
import useChatStore from '@zustand/store';
import useResizeWindow from '@hooks/useResizeWindow';
import { IChatHeaderProps } from '@interfaces/IChatHeaderProps';

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
    <div className="absolute top-0 left-0 z-10 flex gap-4 items-center w-full h-14 px-6 bg-main dark:bg-mainBlack shadow-bottomShadow">
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
