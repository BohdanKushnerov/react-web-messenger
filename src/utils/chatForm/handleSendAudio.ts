import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@myfirebase/config";

const handleSendAudio = async (
  audioBlob: Blob,
  chatUID: string,
  userUID: string,
  currentUserUID: string
) => {
  const metadata = {
    contentType: "audio/webm",
  };

  const storageRef = ref(storage, `audio/webm/${userUID}/${uuidv4()}.webm`);

  await uploadBytes(storageRef, audioBlob, metadata);

  const downloadURL = await getDownloadURL(storageRef);

  const fileArr = [
    {
      type: "audio/webm",
      name: "voice audio",
      url: downloadURL,
    },
  ];

  const fileDescription = "";

  // надо создать сообщение с полем файл и отправить на сохранение
  await addDoc(collection(db, `chats/${chatUID}/messages`), {
    file: fileArr,
    message: fileDescription,
    senderUserID: currentUserUID,
    date: Timestamp.now(),
    isRead: false,
  });

  if (currentUserUID && userUID) {
    await updateDoc(doc(db, "userChats", currentUserUID), {
      [chatUID + ".lastMessage"]: `${String.fromCodePoint(
        127908
      )} Voice message`,
      [chatUID + ".senderUserID"]: currentUserUID,
      [chatUID + ".date"]: serverTimestamp(),
    });
    // =====================================================
    await updateDoc(doc(db, "userChats", userUID), {
      [chatUID + ".lastMessage"]: `${String.fromCodePoint(
        127908
      )} Voice message`,
      [chatUID + ".senderUserID"]: currentUserUID,
      [chatUID + ".date"]: serverTimestamp(),
    });
  }
};

export default handleSendAudio;
