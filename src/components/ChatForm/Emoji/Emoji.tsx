import { FC, lazy, Suspense, useDeferredValue, useState } from 'react';

import LoaderUIActions from '@components/LoaderUIActions/LoaderUIActions';
const EmojiPickerWindow = lazy(
  () => import('../EmojiPickerWindow/EmojiPickerWindow')
);
import useChatStore from '@zustand/store';
import useCloseModal from '@hooks/useCloseModal';
import sprite from '@assets/sprite.svg';

const Emoji: FC = () => {
  const [isShowEmoji, setIsShowEmoji] = useState(false);
  const [emojiTimeOutId, setEmojiTimeOutId] = useState<NodeJS.Timeout | null>(
    null
  );
  const deferredIsShowEmoji = useDeferredValue(isShowEmoji);

  useCloseModal(() => setIsShowEmoji(false));

  const editingMessageInfo = useChatStore(state => state.editingMessageInfo);

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
    }, 300);
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
      {deferredIsShowEmoji && (
        <Suspense
          fallback={
            <div className="absolute -top-1 -left-1">
              <LoaderUIActions size={50} />
            </div>
          }
        >
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
