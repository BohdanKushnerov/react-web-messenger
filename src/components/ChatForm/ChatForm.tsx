import FileInput from '@components/Inputs/FileInput/FileInput';
import { IChatFormProps } from '@interfaces/IChatFormProps';
import sprite from "@assets/sprite.svg"

function ChatForm({
  message,
  handleChangeMessage,
  handleManageSendMessage,
}: IChatFormProps) {
  return (
    <div className="absolute bottom-0 left-0 z-10 w-full flex justify-center">
      <div className="relative w-full xl:w-8/12">
        <form
          className="flex items-center gap-4 h-20 px-6 shadow-whiteTopShadow"
          onSubmit={handleManageSendMessage}
        >
          <div className="w-full h-10">
            <input
              autoFocus
              className="w-full h-full py-1 pl-10 pr-14 rounded-3xl bg-mySeacrhBcg text-white border-2 border-transparent outline-none focus:border-solid focus:border-cyan-500"
              type="text"
              placeholder="Write your message..."
              value={message}
              onChange={handleChangeMessage}
            />
          </div>
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
      </div>
    </div>
  );
}

export default ChatForm;
