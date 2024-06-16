import ButtonClose from '@components/Buttons/ButtonClose/ButtonClose';
import CopyButton from '@components/ChatContextMenu/CopyButton/CopyButton';
import DeleteButton from '@components/ChatContextMenu/DeleteButton/DeleteButton';

import useChatStore from '@zustand/store';

const ChatFormSelectedMsgs = () => {
  const updateIsSelectedMessages = useChatStore(
    state => state.updateIsSelectedMessages
  );

  return (
    <div className="flex h-full w-full flex-col justify-center shadow-whiteTopShadow xl:w-8/12">
      <div
        className={`relative flex h-14 flex-row rounded-3xl border-2 border-transparent bg-mediumLightZinc px-8 text-black outline-none dark:bg-darkBackground dark:text-white`}
      >
        <div className="relative">
          <ButtonClose
            handleClickButtonClose={() => updateIsSelectedMessages(false)}
          />
        </div>

        <div className="ml-auto flex flex-row gap-x-1">
          <CopyButton textContent={false} white="black" dark="white" />
          <DeleteButton textContent={false} color="red" />
        </div>
      </div>
    </div>
  );
};

export default ChatFormSelectedMsgs;
