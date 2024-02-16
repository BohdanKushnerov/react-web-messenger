import ButtonClose from '@components/Buttons/ButtonClose/ButtonClose';
import CopyButton from '@components/Messages/ContextMenu/CopyButton/CopyButton';
import DeleteButton from '@components/Messages/ContextMenu/DeleteButton/DeleteButton';
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
        <ButtonClose
          handleClickButtonClose={() => updateIsSelectedMessages(false)}
        />

        <div className="flex flex-row gap-x-1 ml-auto">
          <CopyButton textContent={false} white="black" dark="white" />
          <DeleteButton textContent={false} color="red" />
        </div>
      </div>
    </div>
  );
};

export default ChatFormSelectedMsgs;
