import { FC, Suspense, lazy, useRef, useState } from 'react';

const FileInputModal = lazy(
  () => import('@components/Modals/FileInputModal/FileInputModal')
);
import LoaderUIActions from '@components/LoaderUIActions/LoaderUIActions';
import FileInput from '@components/Inputs/FileInput/FileInput';
import useChatStore from '@zustand/store';
import sprite from '@assets/sprite.svg';
import '@i18n';

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
      <button
        className={`absolute ${
          editingMessageInfo ? 'bottom-1' : 'top-7'
        } right-16 w-10 h-10 flex justify-center items-center bg-transparent transition-all duration-300 hover:bg-zinc-400 hover:dark:bg-zinc-100/10 rounded-full cursor-pointer`}
        onClick={handleClickFileInput}
        aria-label="Attach file to message"
      >
        <svg
          width={24}
          height={24}
          className="fill-zinc-800 dark:fill-zinc-400"
        >
          <use href={sprite + '#icon-paper-clip'} />
        </svg>

        <FileInput
          handleChangeFileInput={handleChangeFileInput}
          fileInputRef={fileInputRef}
        />
      </button>
      {isModalAddFileOpen && (
        <Suspense
          fallback={
            <div className="absolute top-6 right-14">
              <LoaderUIActions size={50} />
            </div>
          }
        >
          <FileInputModal
            fileInputRef={fileInputRef}
            setIsModalAddFileOpen={setIsModalAddFileOpen}
            handleToggleModal={handleToggleModal}
          />
        </Suspense>
      )}
    </>
  );
};

export default FileAttachment;
