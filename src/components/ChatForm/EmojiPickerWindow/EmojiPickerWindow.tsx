import type { EmojiClickData } from 'emoji-picker-react';
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';
import type { FC } from 'react';
import { useRef } from 'react';

import TransitionComponent from '@components/common/TransitionComponent/TransitionComponent';

import useChatStore from '@store/store';

interface IEmojiPickerWindowProps {
  deferredIsShowEmoji: boolean;
}

const EmojiPickerWindow: FC<IEmojiPickerWindowProps> = ({
  deferredIsShowEmoji,
}) => {
  const nodeRefEmoji = useRef(null);

  const setMessage = useChatStore(state => state.setMessage);

  const handleSelectEmoji = (emojiData: EmojiClickData) => {
    setMessage(prevState => prevState + emojiData.emoji);
  };

  return (
    <>
      <TransitionComponent
        className="absolute bottom-12 left-0 origin-bottom-left"
        nodeRef={nodeRefEmoji}
        exitedBehavior="opacity"
        enteredBehavior="opacity"
        condition={deferredIsShowEmoji}
        timeout={250}
      >
        <EmojiPicker
          height={400}
          onEmojiClick={handleSelectEmoji}
          searchDisabled
          previewConfig={{ showPreview: false }}
          emojiStyle={EmojiStyle.GOOGLE}
          lazyLoadEmojis={true}
        />
      </TransitionComponent>
    </>
  );
};

export default EmojiPickerWindow;
