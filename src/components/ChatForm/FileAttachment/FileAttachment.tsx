import { FC, Suspense, lazy, useRef, useState } from 'react';

import ButtonAttachFile from '@components/Buttons/ButtonAttachFile/ButtonAttachFile';
import FileInput from '@components/Inputs/FileInput/FileInput';
import LoaderUIActions from '@components/LoaderUIActions/LoaderUIActions';

import useChatStore from '@zustand/store';

import '@i18n';

const FileInputModal = lazy(
  () => import('@components/Modals/FileInputModal/FileInputModal')
);

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
            <div className="absolute right-14 top-6">
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
