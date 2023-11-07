import React, { useRef, useState } from 'react';
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { DefaultExtensionType } from 'react-file-icon';
import Scrollbars from 'react-custom-scrollbars-2';

import ModalWindow from '@components/Modals/ModalWindow/ModalWindow';
import ButtonCloseModal from '@components/Buttons/ButtonCloseModal/ButtonCloseModal';
import UploadPhotoFile from '@components/UploadPhotoFile/UploadPhotoFile';
import UploadDocumentFile from '@components/UploadDocumentFile/UploadDocumentFile';
import { db, storage } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import { TFileStatuses } from 'types/TFileStatuses';
import sprite from '@assets/sprite.svg';

function FileInput() {
  const [isModalAddFileOpen, setIsModalAddFileOpen] = useState(false);
  const [fileDescription, setFileDescription] = useState('');
  const [fileStatuses, setFileStatuses] = useState<TFileStatuses>({});
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const scrollbarsRef = useRef<Scrollbars>(null);

  console.log("fileStatuses", fileStatuses);

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID, userUID } = useChatStore(state => state.currentChatInfo);
  const editingMessageInfo = useChatStore(state => state.editingMessageInfo);

  const handleToggleModal = () => {
    setIsModalAddFileOpen(prev => !prev);
  };

  const handleCloseAddFileModal = () => {
    setIsModalAddFileOpen(false);
    // setUploadFile('');
    if (fileDescription) {
      setFileDescription('');
    }
    // сброс инпута на закрытие
    if (hiddenFileInput.current) {
      hiddenFileInput.current.value = '';
    }
  };

  const handleManageSendFile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (hiddenFileInput.current?.files && currentUserUID) {
      try {
        const promiseArrayURLsOfFiles = Array.from(
          hiddenFileInput.current.files
        ).map(async file => {
          //=========================================================
          const metadata = {
            contentType: file.type,
          };

          const storageRef = ref(
            storage,
            `${file.type}/${currentUserUID}/${file.name}`
          );
          const fileBlob = new Blob([file]);

          const uploadTask = uploadBytesResumable(
            storageRef,
            fileBlob,
            metadata
          );

          return new Promise((resolve, reject)=>{
            uploadTask.on(
              'state_changed',
              snapshot => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');

                setFileStatuses(prev => ({
                  ...prev,
                  [file.name]: progress,
                }));
              },
              error => {
                console.log('error', error);
              },
              async () => {
                try {
                  const downloadURL = await getDownloadURL(
                    uploadTask.snapshot.ref
                  );
                  console.log('File available at', downloadURL);

                  resolve({
                    type: file.type,
                    name: file.name,
                    url: downloadURL,
                  });
                } catch (error) {
                  reject(error);
                }
              }
            );
          })
        });

        const filesArr = await Promise.all(promiseArrayURLsOfFiles);

        // надо создать сообщение с полем файл и отправить на сохранение
        await addDoc(collection(db, `chats/${chatUID}/messages`), {
          file: filesArr,
          message: fileDescription ? fileDescription : '',
          senderUserID: currentUserUID,
          date: Timestamp.now(),
          isRead: false,
        });

        if (currentUserUID && userUID) {
          await updateDoc(doc(db, 'userChats', currentUserUID), {
            [chatUID + '.lastMessage']: `${String.fromCodePoint(128206)} ${
              filesArr.length
            } file(s) ${fileDescription}`,
            [chatUID + '.senderUserID']: currentUserUID,
            [chatUID + '.date']: serverTimestamp(),
          });
          // =====================================================
          await updateDoc(doc(db, 'userChats', userUID), {
            [chatUID + '.lastMessage']: `${String.fromCodePoint(128206)} ${
              filesArr.length
            } file(s) ${fileDescription}`,
            [chatUID + '.senderUserID']: currentUserUID,
            [chatUID + '.date']: serverTimestamp(),
          });
        }
      } catch (error) {
        console.error('error handleManageSendFile', error);
      }
      setFileStatuses({});
      handleCloseAddFileModal();
    }
  };

  const handleChangeFileDescription = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFileDescription(e.target.value);
  };

  const handleClickFileInput = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (
      target.nodeName !== 'svg' &&
      target.nodeName !== 'use' &&
      target.nodeName !== 'input'
    ) {
      return;
    }

    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
      console.log('click input');
    }
  };

  const handleChangeFileInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log('event', event);

    if (event.target.files) {
      const fileUploaded = event.target.files[0];
      const { type, name } = fileUploaded;

      console.log(`fileUploaded: ${name}`);
      console.log(`Тип файла: ${type}`);

      handleToggleModal();
    }
  };

  return (
    <>
      <button
        className={`absolute ${
          editingMessageInfo ? 'bottom-1' : 'top-7'
        } right-16 w-10 h-10 flex justify-center items-center bg-transparent hover:bg-hoverGray rounded-full cursor-pointer`}
        onClick={handleClickFileInput}
      >
        <svg width={24} height={24}>
          <use href={sprite + '#icon-paper-clip'} fill="rgb(170,170,170)" />
        </svg>
        <input
          style={{ display: 'none' }}
          type="file"
          multiple
          onChange={handleChangeFileInput}
          ref={hiddenFileInput}
        />
      </button>
      {isModalAddFileOpen && (
        <ModalWindow handleToggleModal={handleToggleModal}>
          <div className="h-full flex justify-center items-center">
            <div className="relative w-1/3 h-1/2 flex flex-col gap-8 justify-between items-center p-2 bg-myBlackBcg rounded-3xl">
              <p className="text-white font-extrabold">Send File(s)</p>
              <ButtonCloseModal handleCloseModal={handleCloseAddFileModal} />
              <Scrollbars
                ref={scrollbarsRef}
                autoHide
                style={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <ul className="flex flex-col gap-2">
                  {hiddenFileInput.current?.files &&
                    Array.from(hiddenFileInput.current.files).map(file => {
                      // console.log('file', file);
                      if (
                        file.type === 'image/jpeg' ||
                        file.type === 'image/png' ||
                        file.type === 'image/gif' ||
                        file.type === 'image/webp'
                      ) {
                        return (
                          <UploadPhotoFile
                            key={file.name}
                            status={fileStatuses[file.name]}
                            file={file}
                          />
                        );
                      } else {
                        const fileType: DefaultExtensionType =
                          (file.name
                            .split('.')
                            .pop() as DefaultExtensionType) || 'default';

                        return (
                          <UploadDocumentFile
                            key={file.name}
                            file={file}
                            fileType={fileType}
                            status={fileStatuses[file.name]}
                          />
                        );
                      }
                    })}
                </ul>
              </Scrollbars>
              <form
                className="w-full flex items-center gap-4 h-8 px-6"
                onSubmit={handleManageSendFile}
              >
                <div className="relative w-full h-10 sm:w-8/12 ">
                  <input
                    className="w-full h-full py-1 px-10 rounded-3xl bg-mySeacrhBcg text-white outline-none border-2 border-transparent focus:border-cyan-500"
                    type="text"
                    placeholder="Add a caption..."
                    value={fileDescription}
                    onChange={handleChangeFileDescription}
                  />
                </div>
                <button
                  className="h-10 px-2 border border-gray-600 rounded-full text-white hover:shadow-mainShadow hover:bg-gray-800 cursor-pointer"
                  type="submit"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </ModalWindow>
      )}
    </>
  );
}

export default FileInput;
