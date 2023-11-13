import { useEffect, useState } from 'react';
import {
  DocumentData,
  collection,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

import AvatarProfile from '@components/AvatarProfile/AvatarProfile';
import { db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import formatTime from '@utils/formatTime';
import sprite from '@assets/sprite.svg';

interface ISearchMessagesProps {
  setIsShowSearchMessages: (value: boolean) => void;
}

const SearchMessages = ({ setIsShowSearchMessages }: ISearchMessagesProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchMessages, setSearchMessages] = useState<DocumentData[] | null>(
    null
  );
  const [currentChatInfo, setCurrentChatInfo] = useState<DocumentData | null>(
    null
  );

  const { chatUID, userUID } = useChatStore(state => state.currentChatInfo);
  const { photoURL, displayName } = useChatStore(state => state.currentUser);

  useEffect(() => {
    if (!searchValue) {
      setSearchMessages(null)
      return;
    }

    const q = query(
      collection(db, `chats/${chatUID}/messages`),
      where('message', '>=', searchValue),
      where('message', '<=', searchValue + '\uf8ff')
    );

    const unSub = onSnapshot(q, querySnapshot => {
      setSearchMessages(querySnapshot.docs);
    });

    return () => {
      unSub();
    };
  }, [chatUID, searchValue]);

  useEffect(() => {
    const unsubUserInfoData = onSnapshot(doc(db, 'users', userUID), doc => {
      const data = doc.data();
      if (data) {
        setCurrentChatInfo(data);
      }
    });

    return () => {
      unsubUserInfoData();
    };
  }, [userUID]);

  const handleChangeSearchMessage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(e.target.value);
  };

  const handleClickCloseSearchMessage = () => {
    setIsShowSearchMessages(false);
  };

  const handleClickSearchMessage = () => {
  // 
  };

  return (
    <div>
      <div className="flex justify-around">
        <button
          className="flex justify-center items-center h-12 w-12 bg-transparent hover:bg-hoverGray rounded-full cursor-pointer"
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

        <div className="relative">
          <input
            className="py-2 px-8 h-10 w-full rounded-3xl bg-mySeacrhBcg text-white outline-none border-2 border-transparent focus:border-solid focus:border-cyan-500"
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={handleChangeSearchMessage}
          />

          <svg
            className="absolute top-2 left-2 fill-zinc-600 dark:fill-zinc-400"
            width={24}
            height={24}
          >
            <use href={sprite + '#icon-search'} />
          </svg>
        </div>
      </div>
      {searchMessages && (
        <ul className="flex flex-col justify-center gap-2">
          {searchMessages.length === 0 && (
            <p className="text-zinc-600 dark:text-white">
              Not found messages, change search value
            </p>
          )}
          {searchMessages.map(msg => {
            console.log(msg.data().senderUserID);
            return (
              <li
                key={msg.id}
                className="flex gap-2 justify-start items-center"
                onClick={handleClickSearchMessage}
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
                  <p className="max-w-xs break-all">{msg.data().message}</p>
                  <p className="text-zinc-600 dark:text-white">
                    {msg.data().date &&
                      formatTime(msg.data().date.toDate().toString())}
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
