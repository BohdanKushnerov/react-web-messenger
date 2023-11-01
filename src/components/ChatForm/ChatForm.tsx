import { useEffect, useRef } from 'react';

import FileInput from '@components/Inputs/FileInput/FileInput';
import useChatStore from '@zustand/store';
import { IChatFormProps } from '@interfaces/IChatFormProps';
import sprite from '@assets/sprite.svg';
import Emoji from '@components/Emoji/Emoji';

function ChatForm({
  message,
  setMessage,
  handleChangeMessage,
  handleManageSendMessage,
}: IChatFormProps) {
  // const [isShowEmoji, setIsShowEmoji] = useState(false);
  // const [emojiTimeOutId, setEmojiTimeOutId] = useState<NodeJS.Timeout | null>(
  //   null
  // );

  const inputRef = useRef<HTMLInputElement>(null);

  const { editingMessageInfo, resetEditingMessage } = useChatStore(
    state => state
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, [message]);

  // useEffect(() => {
  //   const handleCloseEmojiOnEsc = (event: KeyboardEvent) => {
  //     if (event.key === 'Escape') {
  //       setIsShowEmoji(false);
  //     }
  //   };

  //   if (isShowEmoji) {
  //     window.addEventListener('keydown', handleCloseEmojiOnEsc);
  //   } else {
  //     window.removeEventListener('keydown', handleCloseEmojiOnEsc);
  //   }

  //   return () => {
  //     window.removeEventListener('keydown', handleCloseEmojiOnEsc);
  //   };
  // }, [isShowEmoji]);

  const handleCancelEditingMessage = () => {
    resetEditingMessage();
  };

  // const handleSelectEmoji = (emojiData: EmojiClickData) => {
  //   setMessage((prev: string) => prev + emojiData.emoji);
  // };

  // const handleMouseEnterEmoji = () => {
  //   setIsShowEmoji(true);
  //   if (emojiTimeOutId) {
  //     clearTimeout(emojiTimeOutId);
  //     setEmojiTimeOutId(null);
  //   }
  // };

  // const handleMouseLeaveEmoji = () => {
  //   console.log('start Timeout Leave');
  //   const timeoutId = setTimeout(() => {
  //     setIsShowEmoji(false);
  //     console.log('finish Timeout Leave');
  //   }, 500);
  //   setEmojiTimeOutId(timeoutId);
  // };

  // const handleCloseEmojiOnEsc = event => {
  //   console.log(event);
  //   if (event.key === 'Escape') {
  //     setIsShowEmoji(false);
  //   }
  // };

  return (
    <div className="absolute bottom-0 left-0 z-10 w-full h-24 flex flex-col items-center">
      <div className="relative flex flex-col justify-center w-full h-full shadow-whiteTopShadow xl:w-8/12">
        {editingMessageInfo && (
          <div className="relative flex items-center gap-3 ml-3 mr-16 px-10 rounded-3xl bg-mySeacrhBcg">
            <svg width={20} height={20}>
              <use href={sprite + '#icon-pencil'} fill="#FFFFFF" />
            </svg>
            <div>
              <p className="flex text-violet-500">Edit message</p>
              <p className="text-white">
                {editingMessageInfo.selectedMessage.data().message ||
                  'empty message... =)'}
              </p>
            </div>
            <button onClick={handleCancelEditingMessage}>
              <svg className="absolute top-3.5 right-4" width={20} height={20}>
                <use href={sprite + '#icon-cross-close'} fill="#FFFFFF" />
              </svg>
            </button>
          </div>
        )}
        <form
          className="flex justify-center items-center gap-2 px-3"
          onSubmit={handleManageSendMessage}
        >
          <input
            autoFocus
            className="w-full h-10 py-1 pl-10 pr-14 rounded-3xl bg-mySeacrhBcg text-white border-2 border-transparent outline-none focus:border-solid focus:border-cyan-500"
            type="text"
            placeholder="Write your message..."
            ref={inputRef}
            value={message}
            onChange={handleChangeMessage}
          />
          <button className="flex justify-center items-center h-12 w-12 bg-transparent hover:bg-hoverGray rounded-full cursor-pointer">
            <svg width={24} height={24}>
              <use
                href={sprite + '#icon-send-message'}
                fill="rgb(170,170,170)"
              />
            </svg>
          </button>
        </form>
        <FileInput />
        <Emoji setMessage={setMessage} />
      </div>
    </div>
  );
}

export default ChatForm;
