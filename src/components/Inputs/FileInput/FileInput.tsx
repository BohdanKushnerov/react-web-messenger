import { FC, Suspense, lazy, useRef, useState } from 'react';

const FileInputModal = lazy(
  () => import('@components/Modals/FileInputModal/FileInputModal')
);
import useChatStore from '@zustand/store';
import sprite from '@assets/sprite.svg';
import '@i18n';

const FileInput: FC = () => {
  const [isModalAddFileOpen, setIsModalAddFileOpen] = useState(false);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

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

    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleChangeFileInput = async (
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
        <input
          style={{ display: 'none' }}
          type="file"
          multiple
          onChange={handleChangeFileInput}
          ref={hiddenFileInput}
        />
      </button>
      {isModalAddFileOpen && (
        <Suspense>
          <FileInputModal
            hiddenFileInput={hiddenFileInput}
            setIsModalAddFileOpen={setIsModalAddFileOpen}
            handleToggleModal={handleToggleModal}
          />
        </Suspense>
      )}
    </>
  );
};

export default FileInput;
