import ButtonClose from '@components/Buttons/ButtonClose/ButtonClose';
import CopyButton from '@components/ChatContextMenu/CopyButton/CopyButton';
import DeleteButton from '@components/ChatContextMenu/DeleteButton/DeleteButton';
import useChatStore from '@zustand/store';

const ChatFormSelectedMsgs = () => {
  const updateIsSelectedMessages = useChatStore(
    state => state.updateIsSelectedMessages
  );

  return (
    <div className="flex flex-col justify-center w-full h-full shadow-whiteTopShadow xl:w-8/12">
      <div
        className={`relative flex flex-row h-14 px-8 rounded-3xl bg-zinc-300 dark:bg-mySeacrhBcg text-black dark:text-white border-2 border-transparent outline-none`}
      >
        <div className="relative">
          <ButtonClose
            handleClickButtonClose={() => updateIsSelectedMessages(false)}
          />
        </div>

        <div className="flex flex-row gap-x-1 ml-auto">
          <CopyButton textContent={false} white="black" dark="white" />
          <DeleteButton textContent={false} color="red" />
        </div>
      </div>
    </div>
  );
};

export default ChatFormSelectedMsgs;
