import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import AvatarProfile from '@components/AvatarProfile/AvatarProfile';
import Search from '@components/Inputs/Search/Search';
import useChatStore from '@zustand/store';
import useSearchMessageValue from '@hooks/useSearchMessageValue';
import useChatInfo from '@hooks/useChatInfo';
import formatTimeSearchMsg from '@utils/formatTimeSearchMsg';
import { ISearchMessagesProps } from '@interfaces/ISearchMessagesProps';
import sprite from '@assets/sprite.svg';
import '@i18n';

const SearchMessages: FC<ISearchMessagesProps> = ({
  setIsShowSearchMessages,
}) => {
  const { t } = useTranslation();

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
    <div>
      <div className="flex justify-around items-center gap-1">
        <button
          className="flex justify-center items-center h-9 w-10 bg-transparent transition-all duration-300 hover:bg-zinc-400/30 hover:dark:bg-zinc-100/10 rounded-full cursor-pointer"
          onClick={handleClickCloseSearchMessage}
        >
          <svg
            className="fill-zinc-600 dark:fill-zinc-400"
            width={16}
            height={16}
          >
            <use href={sprite + '#icon-cross-close'} />
          </svg>
        </button>

        <Search
          value={searchMessageValue}
          handleChange={handleChangeSearchMessage}
          placeholderText={t('SearchMsgPlaceholder')}
        />
      </div>
      {searchMessages && (
        <ul className="flex flex-col justify-center gap-2">
          {searchMessages.length === 0 && (
            <p className="text-zinc-600 dark:text-white">{t('NotFoundMsg')}</p>
          )}
          {searchMessages.map(msg => {
            console.log(msg.data().senderUserID);
            return (
              <li
                key={msg.id}
                className="flex gap-2 justify-start items-center"
                // onClick={handleClickSearchMessage}
              >
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
                  <p className="max-w-xs break-all text-zinc-600 dark:text-zinc-300">
                    {msg.data().message}
                  </p>
                  <p className="text-zinc-600 dark:text-white">
                    {msg.data().date &&
                      formatTimeSearchMsg(msg.data().date.toDate().toString())}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchMessages;
