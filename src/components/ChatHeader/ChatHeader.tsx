import type { FC } from 'react';
import { Suspense, lazy, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ChatHeaderOpponentInfo from '@components/ChatHeader/ChatHeaderOpponentInfo/ChatHeaderOpponentInfo';
import LoaderUIActions from '@components/common/LoaderUIActions/LoaderUIActions';
import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import useChatStore from '@store/store';

import useResizeWindow from '@hooks/useResizeWindow';

import { IconId } from '@enums/iconsSpriteId';

interface IChatHeaderProps {
  setIsShowSearchMessages: (value: boolean) => void;
}

const Button = lazy(() => import('@components/common/Button/Button'));

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
          <Button
            variant="comeBack"
            type="button"
            onClick={handleClickNavigateToSidebarScreen}
            ariaLabel="Come back"
          >
            <SvgIcon
              className="rotate-180 fill-darkZinc"
              iconId={IconId.IconRightArrow}
              size={24}
            />
          </Button>
        </Suspense>
      )}

      <ChatHeaderOpponentInfo />

      <Button
        variant="searchMessages"
        type="button"
        onClick={handleClickShowSearchMessages}
        ariaLabel="Search messages"
      >
        <SvgIcon
          className="fill-darkZinc dark:fill-mediumZinc"
          iconId={IconId.IconSearch}
          size={24}
        />
      </Button>
    </div>
  );
};

export default ChatHeader;
