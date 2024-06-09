import { forwardRef, useRef, useState } from 'react';
import { DefaultExtensionType } from 'react-file-icon';
import { useTranslation } from 'react-i18next';

import ModalWindow from '@components/Modals/ModalWindow/ModalWindow';
import ButtonClose from '@components/Buttons/ButtonClose/ButtonClose';
import UploadPhotoFile from '@components/ChatForm/UploadPhotoFile/UploadPhotoFile';
import UploadDocumentFile from '@components/ChatForm/UploadDocumentFile/UploadDocumentFile';
import useChatStore from '@zustand/store';
import handleSendAttachedFilesMessage from '@utils/chatForm/handleSendAttachedFilesMessage';
import { IFileInputModalProps } from '@interfaces/IFileInputModalProps';
import { FilesUploadStatuses } from 'types/FilesUploadStatuses';
import '@i18n';

const FileInputModal = forwardRef<HTMLInputElement, IFileInputModalProps>(
  ({ setIsModalAddFileOpen, handleToggleModal }, ref) => {
    const [fileDescription, setFileDescription] = useState('');
    const [uploadFilesStatus, setUploadFilesStatus] =
      useState<FilesUploadStatuses>({});
    const scrollbarsRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation('translation', { keyPrefix: 'FileInput' });

    const currentUserUID = useChatStore(state => state.currentUser.uid);
    const { chatUID, userUID } = useChatStore(state => state.currentChatInfo);

    const handleCloseAddFileModal = () => {
      setIsModalAddFileOpen(false);
      if (fileDescription) {
        setFileDescription('');
      }
      if (ref && 'current' in ref && ref.current) {
        ref.current.value = '';
      }
    };

    const handleManageSendFile = async (e: React.FormEvent) => {
      e.preventDefault();

      await handleSendAttachedFilesMessage(
        ref,
        currentUserUID,
        userUID,
        chatUID,
        setUploadFilesStatus,
        fileDescription,
        handleCloseAddFileModal
      );
    };

    const handleChangeFileDescription = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      setFileDescription(e.target.value);
    };
    return (
      <ModalWindow handleToggleModal={handleToggleModal}>
        <div className="h-full flex justify-center items-center">
          <div className="relative w-full sm:w-1/2 xl:w-1/3 h-1/2 flex flex-col gap-8 justify-between items-center p-2 bg-gray-200 dark:bg-myBlackBcg rounded-3xl shadow-mainShadow">
            <p className="text-black dark:text-white font-extrabold">
              {`${t('Send')} ${
                ref && 'current' in ref && ref.current?.files?.length
              } ${t('Files')}`}
            </p>
            <ButtonClose handleClickButtonClose={handleCloseAddFileModal} />
            <div ref={scrollbarsRef} className="w-full h-full overflow-scroll">
              <ul className="flex flex-col gap-2">
                {ref &&
                  'current' in ref &&
                  ref.current?.files &&
                  Array.from(ref.current.files).map(file => {
                    if (file.type.includes('image')) {
                      return (
                        <UploadPhotoFile
                          key={file.name}
                          status={uploadFilesStatus[file.name]}
                          file={file}
                        />
                      );
                    } else {
                      const fileType: DefaultExtensionType =
                        (file.name.split('.').pop() as DefaultExtensionType) ||
                        'default';

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
            </div>
            <form
              className="w-full flex items-center gap-4 h-8 px-6"
              onSubmit={handleManageSendFile}
            >
              <div className="relative w-full h-10 sm:w-8/12 ">
                <input
                  className="w-full h-full py-1 px-10 rounded-3xl bg-zinc-500 dark:bg-mySeacrhBcg text-white outline-none border-2 border-transparent focus:border-cyan-500"
                  type="text"
                  placeholder={t('ImageCaptionPlaceholder')}
                  value={fileDescription}
                  onChange={handleChangeFileDescription}
                />
              </div>
              <button
                className="px-2 py-1 border border-gray-600 rounded-full text-black dark:text-white transition-all duration-300 hover:shadow-mainShadow hover:bg-zinc-400 hover:dark:bg-gray-800"
                type="submit"
                disabled={Object.keys(uploadFilesStatus).length > 0}
                aria-label="Send"
              >
                {t('Send')}
              </button>
            </form>
          </div>
        </div>
      </ModalWindow>
    );
  }
);

export default FileInputModal;
