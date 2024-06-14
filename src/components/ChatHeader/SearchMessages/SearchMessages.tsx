import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import AvatarProfile from '@components/AvatarProfile/AvatarProfile';
import SearchMsgsInput from '@components/Inputs/SearchMsgsInput/SearchMsgsInput';
import useChatStore from '@zustand/store';
import useSearchMessageValue from '@hooks/useSearchMessageValue';
import useChatInfo from '@hooks/useChatInfo';
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

  const { searchMessages, searchMessageValue, setSearchMessageValue } =
    useSearchMessageValue();
  const currentChatInfo = useChatInfo(userUID);

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
      <div className="flex justify-around items-center gap-1">
        <button
          className="flex justify-center items-center h-9 w-10 bg-transparent transition-all duration-300 hover:bg-mediumZinc hover:dark:bg-veryLightZincOpacity10 rounded-full cursor-pointer"
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

        <SearchMsgsInput
          value={searchMessageValue}
          handleChange={handleChangeSearchMessage}
          placeholderText={t('SearchMsgPlaceholder')}
        />
      </div>
      {searchMessages && (
        <ul className="flex flex-col justify-center gap-2">
          {searchMessages.length === 0 && (
            <p className="text-darkZinc dark:text-white">{t('NotFoundMsg')}</p>
          )}
          {searchMessages.map(msg => (
            <li key={msg.id} className="flex gap-2 justify-start items-center">
              <div>
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
              </div>
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
