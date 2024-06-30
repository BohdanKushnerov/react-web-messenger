import type { FC } from 'react';
import { Suspense, lazy, useRef, useState } from 'react';

import FileInput from '@components/Inputs/FileInput/FileInput';
import Button from '@components/common/Button/Button';
import LoaderUIActions from '@components/common/LoaderUIActions/LoaderUIActions';
import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import useChatStore from '@store/store';

import { IconId } from '@enums/iconsSpriteId';

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
      <Button
        variant="attachFileToMessage"
        position={editingMessageInfo ? 'bottom' : 'top'}
        type="button"
        onClick={handleClickFileInput}
        ariaLabel="Attach file to message"
      >
        <SvgIcon
          className="fill-ultraDarkZinc dark:fill-mediumZinc"
          iconId={IconId.IconPaperClip}
          size={24}
        />
        <FileInput
          handleChangeFileInput={handleChangeFileInput}
          ref={fileInputRef}
        />
      </Button>

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
