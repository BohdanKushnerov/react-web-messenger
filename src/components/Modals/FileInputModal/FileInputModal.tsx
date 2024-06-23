import { forwardRef, useRef, useState } from 'react';
import { DefaultExtensionType } from 'react-file-icon';
import { useTranslation } from 'react-i18next';

import ButtonClose from '@components/Buttons/ButtonClose/ButtonClose';
import UploadDocumentFile from '@components/ChatForm/UploadDocumentFile/UploadDocumentFile';
import UploadPhotoFile from '@components/ChatForm/UploadPhotoFile/UploadPhotoFile';
import ModalWindow from '@components/Modals/ModalWindow/ModalWindow';

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
        <div className="flex h-full items-center justify-center">
          <div className="relative flex h-1/2 w-full flex-col items-center justify-between gap-8 rounded-3xl bg-main p-2 shadow-mainShadow dark:bg-mainBlack sm:w-1/2 xl:w-1/3">
            <p className="font-extrabold text-black dark:text-white">
              {`${t('Send')} ${
                ref && 'current' in ref && ref.current?.files?.length
              } ${t('Files')}`}
            </p>

            <ButtonClose handleClickButtonClose={handleCloseAddFileModal} />

            <div ref={scrollbarsRef} className="h-full w-full overflow-scroll">
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
              className="flex h-8 w-full items-center gap-4 px-6"
              onSubmit={handleManageSendFile}
            >
              <div className="relative h-10 w-full sm:w-8/12">
                <input
                  className="h-full w-full rounded-3xl border-2 border-transparent bg-mediumDarkZinc px-10 py-1 text-white outline-none focus:border-mediumDarkCyan dark:bg-darkBackground"
                  type="text"
                  placeholder={t('ImageCaptionPlaceholder')}
                  value={fileDescription}
                  onChange={handleChangeFileDescription}
                />
              </div>
              <button
                className="rounded-full border border-veryDarkGray px-2 py-1 text-black transition-all duration-300 hover:bg-mediumZinc hover:shadow-mainShadow dark:text-white hover:dark:bg-extraDarkGray"
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
