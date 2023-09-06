import { auth, db } from '../../firebase/config';
import {
  DocumentData,
  QuerySnapshot,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

interface ChatListProps {
  chatList: QuerySnapshot<DocumentData, DocumentData> | [];
}
// создаем общий ИД для общего чата + обновляем списки чатов у 2их юзеров(1. я как текущий и 2. тот которого выбрал)
const handleCreateChat = async (user: DocumentData) => {
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
  } catch (error) {
    console.log('error handleCreateChat', error);
  }
};

export default function ChatList({ chatList }: ChatListProps) {
  return (
    <div>
      <ul>
        {chatList instanceof QuerySnapshot &&
          chatList.docs.map(doc => (
            <li
              className="flex"
              key={doc.id}
              onClick={() => handleCreateChat(doc.data())}
            >
              <img
                width={24}
                height={24}
                src={doc.data().photoURL}
                alt={doc.data().displayName}
              />

              <p>{doc.data().displayName}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
