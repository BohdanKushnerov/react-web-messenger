import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase/config';
import {
  DocumentData,
  QuerySnapshot,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';


// создаем общий ИД для общего чата + обновляем списки чатов у 2их юзеров(1. я как текущий и 2. тот которого выбрал)
const handleCreateChat = async (
  user: DocumentData,
  setChatList: React.Dispatch<
    React.SetStateAction<QuerySnapshot<DocumentData, DocumentData> | []>
  >,
  setSearchUsers: (value: string) => void
) => {
  // выйдем если не авторизирован
  if (!auth?.currentUser?.uid) return;

  const currentUserUID = auth?.currentUser?.uid;
  const selectionUserUID = user.uid;

  const combinedUsersChatID =
    currentUserUID && currentUserUID > selectionUserUID
      ? currentUserUID + selectionUserUID
      : selectionUserUID + currentUserUID;

  try {
    // проверим есть ли такой чат уже у нас
    const res = await getDoc(doc(db, 'chats', combinedUsersChatID));

    console.log('res getDoc combinedUsersChatID', res);

    if (!res.exists()) {
      // если нету чата, создаем
      await setDoc(doc(db, 'chats', combinedUsersChatID), { messages: [] });

      // обновляем обьект с нашими чатами и у нас появиться чат в списке чатов
      await updateDoc(doc(db, 'userChats', currentUserUID), {
        [combinedUsersChatID + '.userInfo']: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [combinedUsersChatID + '.date']: serverTimestamp(),
      });

      // обновляем обьект для юзера с которым создаем чат чтобы у него появился чат в списке чатов
      await updateDoc(doc(db, 'userChats', selectionUserUID), {
        [combinedUsersChatID + '.userInfo']: {
          uid: auth?.currentUser.uid,
          displayName: auth?.currentUser.displayName,
          photoURL: auth?.currentUser.photoURL,
        },
        [combinedUsersChatID + '.date']: serverTimestamp(),
      });
    }

    setChatList([]);
    setSearchUsers('');
  } catch (error) {
    console.log('error handleCreateChat', error);
  }
};

interface ChatListProps {
  setSearchUsers: (value: string) => void;
  chatList: QuerySnapshot<DocumentData, DocumentData> | [];
  setChatList: React.Dispatch<
    React.SetStateAction<QuerySnapshot<DocumentData, DocumentData> | []>
  >;
}

type ChatListItem = [
  string,
  {
    userInfo: {
      photoURL: string;
      displayName: string;
      uid: string;
    };
  }
];

export default function ChatList({ setSearchUsers, chatList, setChatList }: ChatListProps) {
  const [userChatList, setUserChatList] = useState<DocumentData | []>([]);

  useEffect(() => {
    if (!auth?.currentUser?.uid) return;
    // ==========================================
    const unSub = onSnapshot(
      doc(db, 'userChats', auth?.currentUser?.uid),
      doc => {
        // const data = doc.data() as DocumentData;
        // const entries = Object.entries(data);
        // ====================================
        const data = doc.data();
        if (data) {
          const entries = Object.entries(data);
          setUserChatList(entries);
        }
      }
    );

    return () => {
      unSub();
    };
  }, []);

  const handleSelectChat = (chat: ChatListItem) => {
    // console.dir(e.currentTarget);
    console.log(chat);

    // надо сделать переписку +
    // добавить переписку когда с поиска выбираешь 
    // но тут уже надо либо контекс либо зустанд
  };

  return (
    <div>
      <ul className="bg-myBlackBcg">
        {/* тут список юзеров в поиске */}
        {chatList instanceof QuerySnapshot &&
          chatList.docs.map(doc => {
            console.log('chatList search doc', doc.data());
            return (
              <li
                className="flex"
                key={doc.id}
                onClick={() =>
                  handleCreateChat(doc.data(), setChatList, setSearchUsers)
                }
              >
                <img
                  width={24}
                  height={24}
                  src={doc.data().photoURL}
                  alt={doc.data().displayName}
                />

                <p className="text-white">{doc.data().displayName}</p>
              </li>
            );
          })}
      </ul>
      {/* тут список твоих чатов */}
      <ul className="bg-myBlackBcg">
        {userChatList &&
          chatList &&
          userChatList.map((chat: ChatListItem) => {
            // console.log('chat', chat);
            return (
              <li
                // id={chat[0]}
                key={chat[0]}
                className="border border-inputChar"
                onClick={()=>handleSelectChat(chat)}
              >
                <img
                  width={24}
                  height={24}
                  src={chat[1].userInfo.photoURL}
                  alt={chat[1].userInfo.displayName}
                />
                <p className="text-white">{chat[1].userInfo.displayName}</p>
                <p className="text-white">last message</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
