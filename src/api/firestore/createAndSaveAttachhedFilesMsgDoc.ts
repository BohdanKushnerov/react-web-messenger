import { addDoc, collection, Timestamp } from "firebase/firestore";

import { db } from "@myfirebase/config";
import { IFile } from "@interfaces/IFile";
import { messageTypes } from "@enums/messageTypes";

const createAndSaveAttachhedFilesMsgDoc = async (
  filesArr: IFile[],
  currentUserUID: string | null,
  chatUID: string | null,
  fileDescriptionUser: string
) => {
  const additionalMsg = `${String.fromCodePoint(128206)} ${
    filesArr.length
  } file(s)`;

  await addDoc(collection(db, `chats/${chatUID}/messages`), {
    type: messageTypes.AttachedFiles,
    file: filesArr,
    fileDescription: additionalMsg,
    message: fileDescriptionUser || '',
    senderUserID: currentUserUID,
    date: Timestamp.now(),
    isRead: false,
    isEdited: false,
    isShowNotification: true,
  });
};

export default createAndSaveAttachhedFilesMsgDoc;
