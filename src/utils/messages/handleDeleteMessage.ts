import {
  DocumentData,
  Firestore,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { TFunction } from 'i18next';
import { toast } from 'react-toastify';

import { db, storage } from '@myfirebase/config';
import makeCursorOnProgress from '@utils/makeCursorOnProgress';
import resetCursorOnDefault from '@utils/resetCursorOnDefault';
import { IFile } from '@interfaces/IFile';

const deleteFilesAndDocs = async (
  selectedDocDataMessage: DocumentData[],
  db: Firestore,
  chatUID: string
) => {
  await Promise.all(
    selectedDocDataMessage.map(async msg => {
      const arrayURLsOfFiles = msg.data()?.file;

      if (arrayURLsOfFiles) {
        const promisesArrOfURLs = arrayURLsOfFiles.map((el: IFile) => {
          const desertRef = ref(storage, el.url);
          return deleteObject(desertRef);
        });

        await Promise.all(promisesArrOfURLs);
      }

      await deleteDoc(doc(db, 'chats', chatUID, 'messages', msg.id));
    })
  );
};

const getLastMessage = async (chatUID: string, db: Firestore) => {
  const queryParams = query(
    collection(db, `chats/${chatUID}/messages`),
    orderBy('date', 'desc'), // Сортируем по убыванию даты, чтобы получить последнее сообщение
    limit(1) // Ограничиваем результат одним документом
  );

  const querySnapshot = await getDocs(queryParams);

  if (querySnapshot.empty) {
    console.log('No messages');
    return null;
  }

  // Получаем последний документ из результатов запроса
  const lastMessage = querySnapshot.docs[0];
  const lastMessageData = lastMessage.data();
  console.log('Last message:', lastMessageData);
  return lastMessageData;
};

export const handleDeleteMessage = async (
  selectedDocDataMessage: DocumentData[] | null,
  chatUID: string | null,
  currentUserUID: string | null,
  userUID: string | null,
  t: TFunction<'translation', undefined>,
  closeModal: () => void
) => {
  if (
    chatUID &&
    selectedDocDataMessage !== null &&
    currentUserUID &&
    userUID &&
    selectedDocDataMessage
  ) {
    try {
      makeCursorOnProgress();

      await deleteFilesAndDocs(selectedDocDataMessage, db, chatUID);

      closeModal();

      const lastMessageFromStorage = await getLastMessage(chatUID, db);

      if (lastMessageFromStorage) {
        const lastFiles = lastMessageFromStorage.file;

        const lastMessage = lastFiles
          ? `${String.fromCodePoint(128206)} ${lastFiles.length} file(s) ${
              lastMessageFromStorage.message
            }`
          : lastMessageFromStorage.message;

        const senderUserIDMessage = lastMessageFromStorage.senderUserID;

        const lastDateMessage = lastMessageFromStorage.date;

        // здесь надо переписывать последнее сообщение мне и напарнику после удаления
        await updateDoc(doc(db, 'userChats', currentUserUID), {
          [chatUID + '.lastMessage']: lastMessage,
          [chatUID + '.senderUserID']: senderUserIDMessage,
          [chatUID + '.date']: lastDateMessage,
        });

        // =====================================================
        await updateDoc(doc(db, 'userChats', userUID), {
          [chatUID + '.lastMessage']: lastMessage,
          [chatUID + '.senderUserID']: senderUserIDMessage,
          [chatUID + '.date']: lastDateMessage,
        });
      } else {
        // пустую строку с пробелом чтобы не падала ошибка

        await updateDoc(doc(db, 'userChats', currentUserUID), {
          [chatUID + '.lastMessage']: ' ',
          [chatUID + '.senderUserID']: ' ',
          [chatUID + '.date']: ' ',
        });
        // =====================================================
        await updateDoc(doc(db, 'userChats', userUID), {
          [chatUID + '.lastMessage']: ' ',
          [chatUID + '.senderUserID']: ' ',
          [chatUID + '.date']: ' ',
        });
      }

      const inputElement = document.getElementById('chatFormInput')!;
      inputElement.focus();

      toast.success(t('Toasts.DeleteMessageSuccess'));
    } catch (error) {
      toast.error(t('Toasts.DeleteMessageError'));
      console.log('handleDeleteMessage error', error);
    } finally {
      resetCursorOnDefault();
    }
  }
};
