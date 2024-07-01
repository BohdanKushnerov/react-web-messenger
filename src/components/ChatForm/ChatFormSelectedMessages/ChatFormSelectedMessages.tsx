import CopyButton from '@components/ChatContextMenu/CopyButton/CopyButton';
import DeleteButton from '@components/ChatContextMenu/DeleteButton/DeleteButton';
import Button from '@components/common/Button/Button';
import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import useChatStore from '@store/store';

import { IconId } from '@enums/iconsSpriteId';

const ChatFormSelectedMessages = () => {
  const updateIsSelectedMessages = useChatStore(
    state => state.updateIsSelectedMessages
  );

  return (
    <div className="flex h-full w-full flex-col justify-center shadow-whiteTopShadow xl:w-8/12">
      <div className="relative flex h-14 flex-row rounded-3xl border-2 border-transparent bg-mediumLightZinc px-8 text-black outline-none dark:bg-darkBackground dark:text-white">
        <div className="relative">
          <Button
            variant="close"
            type="button"
            onClick={() => updateIsSelectedMessages(false)}
            ariaLabel="Close"
          >
            <SvgIcon
              className="fill-darkZinc transition-all duration-300 group-hover:fill-darkGreen dark:fill-white"
              iconId={IconId.IconCrossClose}
              size={16}
            />
          </Button>
        </div>

        <div className="ml-auto flex flex-row gap-x-1">
          <CopyButton textContent={false} white="black" dark="white" />
          <DeleteButton textContent={false} color="fill-mediumDarkRed" />
        </div>
      </div>
    </div>
  );
};

export default ChatFormSelectedMessages;
