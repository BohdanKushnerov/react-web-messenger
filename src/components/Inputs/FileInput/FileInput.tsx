import React, { FC, useRef, useState } from 'react';
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
import { v4 as uuidv4 } from 'uuid';

import ModalWindow from '@components/Modals/ModalWindow/ModalWindow';
import ButtonClose from '@components/Buttons/ButtonClose/ButtonClose';
import UploadPhotoFile from '@components/UploadPhotoFile/UploadPhotoFile';
import UploadDocumentFile from '@components/UploadDocumentFile/UploadDocumentFile';
import { db, storage } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import { FilesUploadStatuses } from 'types/FilesUploadStatuses';
import sprite from '@assets/sprite.svg';

const FileInput: FC = () => {
  const [isModalAddFileOpen, setIsModalAddFileOpen] = useState(false);
  const [fileDescription, setFileDescription] = useState('');
  const [uploadFilesStatus, setUploadFilesStatus] =
    useState<FilesUploadStatuses>({});
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const scrollbarsRef = useRef<Scrollbars>(null);

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
            `${file.type}/${userUID}/${uuidv4()}-${file.name}`
          );

          const fileBlob = new Blob([file]);

          const uploadTask = uploadBytesResumable(
            storageRef,
            fileBlob,
            metadata
          );

          return new Promise((resolve, reject) => {
            uploadTask.on(
              'state_changed',
              snapshot => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');

                setUploadFilesStatus(prev => ({
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

                  if (
                    file.type === 'image/png' ||
                    file.type === 'image/jpeg' ||
                    file.type === 'image/webp'
                  ) {
                    const image = new Image();
                    image.src = URL.createObjectURL(fileBlob);

                    image.onload = () => {
                      const width = image.width;
                      const height = image.height;
                      console.log('Ширина:', width, 'Высота:', height);

                      resolve({
                        type: file.type,
                        name: file.name,
                        url: downloadURL,
                        width,
                        height,
                      });
                    };
                  } else {
                    resolve({
                      type: file.type,
                      name: file.name,
                      url: downloadURL,
                    });
                  }
                } catch (error) {
                  reject(error);
                }
              }
            );
          });
        });

        const filesArr = await Promise.all(promiseArrayURLsOfFiles);

        console.log('filesArr', filesArr);

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
      setUploadFilesStatus({});
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
      console.log('fileUploaded', fileUploaded);
      const { type, name } = fileUploaded;

      console.log(`name: ${name}`);
      console.log(`Тип файла: ${type}`);

      handleToggleModal();
    }
  };

  return (
    <>
      <button
        className={`absolute ${
          editingMessageInfo ? 'bottom-1' : 'top-7'
        } right-16 w-10 h-10 flex justify-center items-center bg-transparent transition-all duration-300 hover:bg-zinc-400 hover:dark:bg-zinc-100/10 rounded-full cursor-pointer`}
        onClick={handleClickFileInput}
      >
        <svg
          width={24}
          height={24}
          className="fill-zinc-800 dark:fill-zinc-400"
        >
          <use href={sprite + '#icon-paper-clip'} />
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
            <div className="relative w-full sm:w-1/2 xl:w-1/3 h-1/2 flex flex-col gap-8 justify-between items-center p-2 bg-gray-200 dark:bg-myBlackBcg rounded-3xl shadow-mainShadow">
              <p className="text-black dark:text-white font-extrabold">
                {`Send ${hiddenFileInput.current?.files?.length} File(s)`}
              </p>
              <ButtonClose handleClickButtonClose={handleCloseAddFileModal} />
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
                            status={uploadFilesStatus[file.name]}
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
                            status={uploadFilesStatus[file.name]}
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
                    className="w-full h-full py-1 px-10 rounded-3xl bg-zinc-500 dark:bg-mySeacrhBcg text-white outline-none border-2 border-transparent focus:border-cyan-500"
                    type="text"
                    placeholder="Add a caption..."
                    value={fileDescription}
                    onChange={handleChangeFileDescription}
                  />
                </div>
                <button
                  className="px-2 py-1 border border-gray-600 rounded-full text-black dark:text-white transition-all duration-300 hover:shadow-mainShadow hover:bg-zinc-400 hover:dark:bg-gray-800"
                  type="submit"
                  disabled={Object.keys(uploadFilesStatus).length > 0}
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
};

export default FileInput;
