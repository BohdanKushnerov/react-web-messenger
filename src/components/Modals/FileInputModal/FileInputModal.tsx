import {
  type Dispatch,
  type SetStateAction,
  forwardRef,
  useRef,
  useState,
} from 'react';
import type { DefaultExtensionType } from 'react-file-icon';
import { useTranslation } from 'react-i18next';

import UploadDocumentFile from '@components/ChatForm/UploadDocumentFile/UploadDocumentFile';
import UploadPhotoFile from '@components/ChatForm/UploadPhotoFile/UploadPhotoFile';
import ModalWindow from '@components/Modals/ModalWindow/ModalWindow';
import Button from '@components/common/Button/Button';
import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import useChatStore from '@store/store';

import handleSendAttachedFilesMessage from '@utils/chatForm/handleSendAttachedFilesMessage';

import { ElementsId } from '@enums/elementsId';
import { IconId } from '@enums/iconsSpriteId';

import type { FilesUploadStatuses } from 'types/FilesUploadStatuses';

import { defaultNS } from '@i18n/i18n';

interface IModalFileInputProps {
  setIsModalAddFileOpen: Dispatch<SetStateAction<boolean>>;
  handleToggleModal: () => void;
}

const FileInputModal = forwardRef<HTMLInputElement, IModalFileInputProps>(
  ({ setIsModalAddFileOpen, handleToggleModal }, ref) => {
    const [fileDescription, setFileDescription] = useState('');
    const [uploadFilesStatus, setUploadFilesStatus] =
      useState<FilesUploadStatuses>({});

    const scrollbarsRef = useRef<HTMLDivElement>(null);

    const { t } = useTranslation(defaultNS, { keyPrefix: 'FileInput' });

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

            <Button
              variant="close"
              type="button"
              onClick={handleCloseAddFileModal}
              ariaLabel="Close"
            >
              <SvgIcon
                className="fill-darkZinc transition-all duration-300 group-hover:fill-darkGreen dark:fill-white"
                iconId={IconId.IconCrossClose}
                size={16}
              />
            </Button>

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
                    }

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
                  })}
              </ul>
            </div>
            <form
              className="flex h-8 w-full items-center gap-4 px-6"
              onSubmit={handleManageSendFile}
            >
              <div className="relative h-10 w-full sm:w-8/12">
                <input
                  id={ElementsId.AttachFilesModalInput}
                  className="h-full w-full rounded-3xl border-2 border-transparent bg-mediumDarkZinc px-10 py-1 text-white outline-none focus:border-mediumDarkCyan dark:bg-darkBackground"
                  type="text"
                  placeholder={t('ImageCaptionPlaceholder')}
                  value={fileDescription}
                  onChange={handleChangeFileDescription}
                />
              </div>
              <Button
                variant="sendFileMessages"
                type="submit"
                disabled={Object.keys(uploadFilesStatus).length > 0}
                ariaLabel="Send"
              >
                {t('Send')}
              </Button>
            </form>
          </div>
        </div>
      </ModalWindow>
    );
  }
);

export default FileInputModal;
