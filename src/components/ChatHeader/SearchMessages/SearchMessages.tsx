import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import AvatarProfile from '@components/AvatarProfile/AvatarProfile';
import SearchInput from '@components/Inputs/SearchInput/SearchInput';

import useChatStore from '@zustand/store';

import useChatInfo from '@hooks/useChatInfo';
import useSearchMessageValue from '@hooks/useSearchMessageValue';

import formatTimeSearchMsg from '@utils/messages/formatTimeSearchMsg';

import { ISearchMessagesProps } from '@interfaces/ISearchMessagesProps';

import sprite from '@assets/sprite.svg';

import '@i18n';

const SearchMessages: FC<ISearchMessagesProps> = ({
  setIsShowSearchMessages,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'General' });

  const { userUID } = useChatStore(state => state.currentChatInfo);
  const { photoURL, displayName } = useChatStore(state => state.currentUser);

  const currentChatInfo = useChatInfo(userUID);

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
    <>
      <div className="flex items-center justify-around gap-1">
        <button
          className="flex h-9 w-10 cursor-pointer items-center justify-center rounded-full bg-transparent transition-all duration-300 hover:bg-mediumZinc hover:dark:bg-veryLightZincOpacity10"
          type="button"
          onClick={handleClickCloseSearchMessage}
          aria-label="Close"
        >
          <svg
            className="fill-darkZinc dark:fill-mediumZinc"
            width={16}
            height={16}
          >
            <use href={sprite + '#icon-cross-close'} />
          </svg>
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
    </>
  );
};

export default SearchMessages;
