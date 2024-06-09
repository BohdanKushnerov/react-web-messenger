import { FC, Suspense, lazy, useRef, useState } from 'react';

import LoaderUIActions from '@components/LoaderUIActions/LoaderUIActions';
import FileInput from '@components/Inputs/FileInput/FileInput';
const FileInputModal = lazy(
  () => import('@components/Modals/FileInputModal/FileInputModal')
);
import useChatStore from '@zustand/store';
import '@i18n';
import ButtonAttachFile from '@components/Buttons/ButtonAttachFile/ButtonAttachFile';

const FileAttachment: FC = () => {
  const [isModalAddFileOpen, setIsModalAddFileOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editingMessageInfo = useChatStore(state => state.editingMessageInfo);

  const handleToggleModal = () => {
    setIsModalAddFileOpen(prev => !prev);
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

    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChangeFileInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      handleToggleModal();
    }
  };

  return (
    <>
      <ButtonAttachFile
        editingMessageInfo={editingMessageInfo}
        handleClickFileInput={handleClickFileInput}
      >
        <FileInput
          handleChangeFileInput={handleChangeFileInput}
          ref={fileInputRef}
        />
      </ButtonAttachFile>
      {isModalAddFileOpen && (
        <Suspense
          fallback={
            <div className="absolute top-6 right-14">
              <LoaderUIActions size={50} />
            </div>
          }
        >
          <FileInputModal
            setIsModalAddFileOpen={setIsModalAddFileOpen}
            handleToggleModal={handleToggleModal}
            ref={fileInputRef}
          />
        </Suspense>
      )}
    </>
  );
};

export default FileAttachment;
