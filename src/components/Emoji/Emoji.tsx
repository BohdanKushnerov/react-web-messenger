import { useEffect, useRef, useState } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { Transition } from 'react-transition-group';

import useChatStore from '@zustand/store';
import { IEmoji } from '@interfaces/IEmoji';
import sprite from '@assets/sprite.svg';

const Emoji = ({ setMessage }: IEmoji) => {
  const [isShowEmoji, setIsShowEmoji] = useState(false);
  const [emojiTimeOutId, setEmojiTimeOutId] = useState<NodeJS.Timeout | null>(
    null
  );
  const nodeRefEmoji = useRef(null);

  const editingMessageInfo = useChatStore(state => state.editingMessageInfo);

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

  const handleSelectEmoji = (emojiData: EmojiClickData) => {
    setMessage((prev: string) => prev + emojiData.emoji);
  };

  const handleMouseEnterEmoji = () => {
    setIsShowEmoji(true);

    if (emojiTimeOutId) {
      clearTimeout(emojiTimeOutId);
      setEmojiTimeOutId(null);
    }
  };

  const handleMouseLeaveEmoji = () => {
    console.log('start Timeout Leave');
    const timeoutId = setTimeout(() => {
      setIsShowEmoji(false);
      console.log('finish Timeout Leave');
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
      <Transition
        nodeRef={nodeRefEmoji}
        in={isShowEmoji}
        timeout={300}
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
      </Transition>
      <div className="flex justify-center items-center w-10 h-10 hover:bg-hoverGray rounded-full">
        <svg width={24} height={24}>
          <use href={sprite + '#icon-emoticon'} fill="rgb(170,170,170)" />
        </svg>
      </div>
    </div>
  );
};

export default Emoji;
