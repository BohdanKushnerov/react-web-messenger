import { type FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import SearchInput from '@components/Inputs/SearchInput/SearchInput';
import AvatarProfile from '@components/common/AvatarProfile/AvatarProfile';
import SvgIcon from '@components/common/SvgIcon/SvgIcon';
import TransitionComponent from '@components/common/TransitionComponent/TransitionComponent';

import useChatStore from '@zustand/store';

import useChatInfo from '@hooks/useChatInfo';
import useSearchMessageValue from '@hooks/useSearchMessageValue';
import useStartTransition from '@hooks/useStartTransition';

import formatTimeSearchMsg from '@utils/messages/formatTimeSearchMsg';

import type { ISearchMessagesProps } from '@interfaces/ISearchMessagesProps';

import { IconId } from '@enums/iconsSpriteId';

import { defaultNS } from '@i18n/i18n';

const SearchMessages: FC<ISearchMessagesProps> = ({
  setIsShowSearchMessages,
}) => {
  const nodeRefSearchMessages = useRef(null);
  const { t } = useTranslation(defaultNS, { keyPrefix: 'General' });

  const { userUID } = useChatStore(state => state.currentChatInfo);
  const { photoURL, displayName } = useChatStore(state => state.currentUser);

  const currentChatInfo = useChatInfo(userUID);

  const startTransition = useStartTransition();
  const { searchMessages, searchMessageValue, setSearchMessageValue } =
    useSearchMessageValue();

  const handleChangeSearchMessage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchMessageValue(e.target.value);
  };

  const handleClickCloseSearchMessage = () => {
    setIsShowSearchMessages(false);
  };

  return (
    <TransitionComponent
      className="origin-right"
      nodeRef={nodeRefSearchMessages}
      exitedBehavior="hidden"
      enteredBehavior="translate-left"
      condition={startTransition}
      timeout={300}
    >
      <div className="flex items-center justify-around gap-1">
        <button
          className="flex h-9 w-10 cursor-pointer items-center justify-center rounded-full bg-transparent transition-all duration-300 hover:bg-mediumZinc hover:dark:bg-veryLightZincOpacity10"
          type="button"
          onClick={handleClickCloseSearchMessage}
          aria-label="Close"
        >
          <SvgIcon
            className="fill-darkZinc dark:fill-mediumZinc"
            iconId={IconId.IconCrossClose}
            size={16}
          />
        </button>

        <SearchInput
          value={searchMessageValue}
          handleChange={handleChangeSearchMessage}
          placeholderText={t('SearchMsgPlaceholder')}
          autoFocus={true}
        />
      </div>
      {searchMessages && (
        <ul className="flex flex-col justify-center gap-2">
          {searchMessages.length === 0 && (
            <p className="text-darkZinc dark:text-white">{t('NotFoundMsg')}</p>
          )}
          {searchMessages.map(msg => (
            <li key={msg.id} className="flex items-center justify-start gap-2">
              <AvatarProfile
                photoURL={
                  msg.data().senderUserID === userUID
                    ? currentChatInfo?.photoURL
                    : photoURL
                }
                displayName={
                  msg.data().senderUserID === userUID
                    ? currentChatInfo?.displayName
                    : displayName
                }
                size="50"
              />
              <div>
                <p className="max-w-xs break-all text-darkZinc dark:text-mediumZinc">
                  {msg.data().message}
                </p>
                <p className="text-darkZinc dark:text-white">
                  {msg.data().date &&
                    formatTimeSearchMsg(msg.data().date.toDate().toString())}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </TransitionComponent>
  );
};

export default SearchMessages;
