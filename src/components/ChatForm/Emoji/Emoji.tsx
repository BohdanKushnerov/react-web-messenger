import type { FC, KeyboardEvent } from 'react';
import { lazy, useDeferredValue, useState } from 'react';

import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import useChatStore from '@store/store';

import useCloseModal from '@hooks/useCloseModal';

import { IconId } from '@enums/iconsSpriteId';

const EmojiPickerWindow = lazy(
  () => import('../EmojiPickerWindow/EmojiPickerWindow')
);

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
    }, 500);
    setEmojiTimeOutId(timeoutId);
  };

  const handleEnterKeyDownEmoji = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      setIsShowEmoji(true);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={`absolute ${
        editingMessageInfo ? 'bottom-1' : 'top-7'
      } left-3 cursor-pointer`}
      onMouseEnter={handleMouseEnterEmoji}
      onMouseLeave={handleMouseLeaveEmoji}
      onKeyDown={handleEnterKeyDownEmoji}
      aria-label="Main emoji"
    >
      <EmojiPickerWindow deferredIsShowEmoji={deferredIsShowEmoji} />

      <div className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:bg-mediumZinc hover:dark:bg-veryLightZincOpacity10">
        <SvgIcon
          className="fill-ultraDarkZinc dark:fill-mediumZinc"
          iconId={IconId.IconEmoticon}
          size={24}
        />
      </div>
    </div>
  );
};

export default Emoji;
