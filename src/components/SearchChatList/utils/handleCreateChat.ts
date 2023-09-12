import { auth, db } from "@myfirebase/config";
import { DocumentData, QuerySnapshot, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

// создаем общий ИД для общего чата + обновляем списки чатов у 2их юзеров(1. я как текущий и 2. тот которого выбрал)
const handleCreateChat = async (
  user: DocumentData,
  setChatList: React.Dispatch<
    React.SetStateAction<QuerySnapshot<DocumentData, DocumentData> | []>
  >,
  updateSearchValue: (value: string) => void
) => {
  // выйдем если не авторизирован
  if (!auth?.currentUser?.uid) return;

  console.log('user in handleCreateChat', user);

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
    updateSearchValue('');
  } catch (error) {
    console.log('error handleCreateChat', error);
  }
};

export default handleCreateChat;