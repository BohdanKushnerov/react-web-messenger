import { FC, useEffect, useRef, useState } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { Transition } from 'react-transition-group';

import useChatStore from '@zustand/store';

const EmojiPickerWindow: FC = () => {
  const [startTransition, setStartTransition] = useState(false);
  const nodeRefEmoji = useRef(null);

  const setMessage = useChatStore(state => state.setMessage);

  useEffect(() => {
    setStartTransition(true);

    return () => {
      setStartTransition(false);
    };
  }, []);

  const handleSelectEmoji = (emojiData: EmojiClickData) => {
    setMessage(prevState => prevState + emojiData.emoji);
  };

  return (
    <Transition
      nodeRef={nodeRefEmoji}
      in={startTransition}
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
    </Transition>
  );
};

export default EmojiPickerWindow;
