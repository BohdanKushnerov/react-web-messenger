import { DocumentData, Firestore, deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

import { storage } from '@myfirebase/config';

import { IFile } from '@interfaces/IFile';

const deleteFilesAndDocsFromStoreAndStorage = async (
  selectedDocDataMessage: DocumentData[],
  db: Firestore,
  chatUID: string
): Promise<void> => {
  const deletionPromises = selectedDocDataMessage.map(async msg => {
    const arrayURLsOfFiles = msg.data()?.file;

    if (arrayURLsOfFiles) {
      const fileDeletionPromises = arrayURLsOfFiles.map((file: IFile) => {
        const fileRef = ref(storage, file.url);
        return deleteObject(fileRef);
      });

      await Promise.all(fileDeletionPromises);
    }

    await deleteDoc(doc(db, 'chats', chatUID, 'messages', msg.id));
  });

  await Promise.all(deletionPromises);
};

export default deleteFilesAndDocsFromStoreAndStorage;
