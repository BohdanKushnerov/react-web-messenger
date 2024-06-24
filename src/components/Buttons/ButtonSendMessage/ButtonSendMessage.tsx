import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import { IconId } from '@enums/iconsSpriteId';

const SendMessage = () => {
  return (
    <button
      className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-transparent transition-all duration-300 hover:bg-veryLightZincOpacity20 hover:dark:bg-veryLightZincOpacity10"
      type="submit"
      aria-label="Send message"
    >
      <SvgIcon
        className="fill-mediumLightZinc dark:fill-mediumZinc"
        iconId={IconId.IconSendMessage}
        size={24}
      />
    </button>
  );
};

export default SendMessage;
