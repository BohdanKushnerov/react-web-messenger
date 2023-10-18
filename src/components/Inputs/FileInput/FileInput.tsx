import React, { useRef, useState } from 'react';
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { DefaultExtensionType, FileIcon, defaultStyles } from 'react-file-icon';

import ModalWindow from '@components/Modals/ModalWindow/ModalWindow';
import ButtonCloseModal from '@components/Buttons/ButtonCloseModal/ButtonCloseModal';
import { db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import uploadFileToStorage from '@utils/uploadFileToStorage';
import Scrollbars from 'react-custom-scrollbars-2';

function FileInput() {
  const [isModalAddFileOpen, setIsModalAddFileOpen] = useState(false);
  const [fileDescription, setFileDescription] = useState('');
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const scrollbarsRef = useRef<Scrollbars>(null);

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID, userUID } = useChatStore(state => state.currentChatInfo);

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

    if (hiddenFileInput.current?.files) {
      const qqq = Array.from(hiddenFileInput.current.files).map(async file => {
        const fileBlob = new Blob([file]);
        const { name, type } = file;

        console.log(file);

        const fileUrlFromStorage = await uploadFileToStorage(
          fileBlob,
          type,
          name
        );

        return {
          type,
          name,
          url: fileUrlFromStorage,
        };
      });

      const filesArr = await Promise.all(qqq);

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
          // [chatUID + '.lastMessage']: `${String.fromCodePoint(128206)} ${
          //   fileDescription ? fileDescription : `${filesArr.length} file(s)`
          // }`,
          [chatUID + '.lastMessage']: `${String.fromCodePoint(128206)} ${
            filesArr.length
          } file(s) ${fileDescription}`,
          [chatUID + '.date']: serverTimestamp(),
        });
        // =====================================================
        await updateDoc(doc(db, 'userChats', userUID), {
          [chatUID + '.lastMessage']: `${String.fromCodePoint(128206)} ${
            filesArr.length
          } file(s) ${fileDescription}`,
          [chatUID + '.date']: serverTimestamp(),
        });
      }

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
      target.nodeName !== 'path' &&
      target.nodeName !== 'svg' &&
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
        className="absolute top-0 right-1 flex justify-center items-center h-10 w-10 bg-transparent hover:bg-hoverGray rounded-full cursor-pointer"
        onClick={handleClickFileInput}
      >
        <svg
          fill="#FFFFFF"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="25px"
          height="25px"
          viewBox="0 0 950 950"
          xmlSpace="preserve"
        >
          <g>
            <path
              d="M857.7,141.3c-30.1-30.1-65.1-53.5-104.3-69.4c-37.8-15.3-77.7-23.2-118.7-23.2c-40.9,0-80.9,7.7-118.7,22.9
		c-39.1,15.8-74.2,38.9-104.3,68.8L73.1,478.3C49.3,501.9,30.9,529.4,18.3,560.2C6.2,589.9,0,621.3,0,653.6
		C0,685.7,6.1,717,18.1,746.7c12.4,30.7,30.7,58.2,54.3,81.899c23.6,23.7,51.2,42,81.9,54.5c29.7,12.101,61.1,18.2,93.3,18.2
		c32.2,0,63.6-6.1,93.3-18.1c30.8-12.5,58.399-30.8,82.1-54.4l269.101-268c17.3-17.2,30.6-37.3,39.699-59.7
		c8.801-21.6,13.2-44.5,13.2-67.899c0-48.2-18.8-93.2-52.899-127c-34-34.2-79.2-53.1-127.301-53.3c-48.199-0.1-93.5,18.6-127.6,52.7
		L269.6,473.3c-8.5,8.5-13.1,19.7-13.1,31.601c0,11.899,4.6,23.199,13.1,31.6l0.7,0.7c17.4,17.5,45.8,17.5,63.3,0.1l168-167.5
		c35.1-34.8,92.1-35,127.199-0.399c16.9,16.8,26.101,39.3,26.101,63.399c0,24.3-9.4,47.101-26.5,64.101l-269,268
		c-0.5,0.5-0.9,0.899-1.2,1.5c-29.7,28.899-68.9,44.699-110.5,44.5c-41.9-0.2-81.2-16.5-110.6-46c-14.7-15-26.1-32.5-34-52
		C95.5,694,91.7,674,91.7,653.6c0-41.8,16.1-80.899,45.4-110.3c0.4-0.3,0.7-0.6,1.1-0.899l337.9-337.8c0.3-0.3,0.6-0.7,0.899-1.1
		c21.4-21,46.3-37.4,74-48.5c27-10.8,55.4-16.2,84.601-16.2c29.199,0,57.699,5.6,84.6,16.4c27.9,11.3,52.9,27.8,74.3,49.1
		c21.4,21.4,37.9,46.4,49.2,74.3c10.9,26.9,16.4,55.4,16.4,84.6c0,29.3-5.5,57.9-16.5,85c-11.301,28-28,53.2-49.5,74.8l-233.5,232.8
		c-8.5,8.5-13.2,19.7-13.2,31.7s4.7,23.2,13.1,31.6l0.5,0.5c17.4,17.4,45.8,17.4,63.2,0L857.5,586.9
		C887.601,556.8,911,521.7,926.9,482.6C942.3,444.8,950,404.9,950,363.9c0-40.9-7.8-80.8-23.1-118.5
		C911.101,206.3,887.8,171.3,857.7,141.3z"
            />
          </g>
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
              <ButtonCloseModal handleToggleModal={handleCloseAddFileModal} />
              <Scrollbars
                ref={scrollbarsRef}
                autoHide
                style={{
                  // top: 0,
                  width: '100%',
                  height: '100%',
                }}
              >
                <ul className="flex flex-col gap-2">
                  {hiddenFileInput.current?.files &&
                    Array.from(hiddenFileInput.current.files).map(file => {
                      console.log('file', file);
                      if (
                        file.type === 'image/jpeg' ||
                        file.type === 'image/png' ||
                        file.type === 'image/gif' ||
                        file.type === 'image/webp'
                      ) {
                        return (
                          <li key={file.name} className="flex gap-2">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Image ${file.name}`}
                              width={48}
                              height={48}
                            />
                            <div className="flex flex-col">
                              <p className="text-white">{file.name}</p>
                              <p className="text-gray-500">
                                {(file.size / 1024).toFixed(2) + ' KB'}
                              </p>
                            </div>
                          </li>
                        );
                      } else {
                        const fileType: DefaultExtensionType =
                          (file.name
                            .split('.')
                            .pop() as DefaultExtensionType) || 'default';

                        return (
                          <li
                            key={file.name}
                            className="flex items-center gap-4"
                          >
                            <span className="w-10 h-10">
                              <FileIcon
                                extension={fileType}
                                {...defaultStyles[fileType]}
                              />
                            </span>
                            <div className="flex flex-col">
                              <p className="text-white">{file.name}</p>
                              <p className="text-gray-500">
                                {(file.size / 1024).toFixed(2) + ' KB'}
                              </p>
                            </div>
                          </li>
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
                    placeholder='Add a caption...'
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
