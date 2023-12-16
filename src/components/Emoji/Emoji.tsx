import { FC, Suspense, lazy, useEffect, useState } from 'react';

const EmojiPickerWindow = lazy(
  () => import('@components/EmojiPickerWindow/EmojiPickerWindow')
);
import useChatStore from '@zustand/store';
import sprite from '@assets/sprite.svg';

const Emoji: FC = () => {
  const [isShowEmoji, setIsShowEmoji] = useState(false);

  const [emojiTimeOutId, setEmojiTimeOutId] = useState<NodeJS.Timeout | null>(
    null
  );

  const editingMessageInfo = useChatStore(state => state.editingMessageInfo);

  // устанавливаем слушателя на открытие емодзи на кнопку esc
  useEffect(() => {
    const handleCloseEmojiOnEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsShowEmoji(false);
      }
    };

    if (isShowEmoji) {
      window.addEventListener('keydown', handleCloseEmojiOnEsc);
    } else {
      window.removeEventListener('keydown', handleCloseEmojiOnEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleCloseEmojiOnEsc);
    };
  }, [isShowEmoji]);

  // const handleSelectEmoji = (emojiData: EmojiClickData) => {
  //   setMessage(prevState => prevState + emojiData.emoji);
  // };

  const handleMouseEnterEmoji = () => {
    setIsShowEmoji(true);

    if (emojiTimeOutId) {
      clearTimeout(emojiTimeOutId);
      setEmojiTimeOutId(null);
    }
  };

  const handleMouseLeaveEmoji = () => {
    const timeoutId = setTimeout(() => {
      setIsShowEmoji(false);
    }, 500);
    setEmojiTimeOutId(timeoutId);
  };

  return (
    <div
      className={`absolute ${
        editingMessageInfo ? 'bottom-1' : 'top-7'
      } left-3 cursor-pointer`}
      onMouseEnter={handleMouseEnterEmoji}
      onMouseLeave={handleMouseLeaveEmoji}
    >
      {isShowEmoji && (
        <Suspense>
          <EmojiPickerWindow />
        </Suspense>
      )}

      <div className="flex justify-center items-center w-10 h-10 transition-all duration-300 hover:bg-zinc-400 hover:dark:bg-zinc-100/10 rounded-full">
        <svg
          width={24}
          height={24}
          className="fill-zinc-800 dark:fill-zinc-400"
        >
          <use href={sprite + '#icon-emoticon'} />
        </svg>
      </div>
    </div>
  );
};

export default Emoji;

{
  /* <Transition
        nodeRef={nodeRefEmoji}
        in={isShowEmoji}
        timeout={100}
        unmountOnExit
      >
        {state => (
          <div
            ref={nodeRefEmoji}
            className={`absolute bottom-12 left-0
            transform origin-bottom-left transition-transform 
            ${state === 'exited' ? 'hidden' : ''} 
                ${
                  state === 'entered'
                    ? 'scale-100 opacity-100'
                    : 'translate-x-4 translate-y-10 scale-0 opacity-50'
                }`}
          >
            <EmojiPicker
              height={400}
              onEmojiClick={handleSelectEmoji}
              searchDisabled
              previewConfig={{ showPreview: false }}
            />
          </div>
        )}
      </Transition> */
}
