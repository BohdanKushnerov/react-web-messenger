import {
  DocumentData,
  Firestore,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from 'firebase/firestore';

const getLastMessage = async (
  chatUID: string,
  db: Firestore
): Promise<DocumentData | null> => {
  const queryParams = query(
    collection(db, `chats/${chatUID}/messages`),
    orderBy('date', 'desc'),
    limit(1)
  );

  const querySnapshot = await getDocs(queryParams);

  if (querySnapshot.empty) {
    console.log('No messages');
    return null;
  }

  const lastMessage = querySnapshot.docs[0];
  return lastMessage.data();
};

export default getLastMessage;
