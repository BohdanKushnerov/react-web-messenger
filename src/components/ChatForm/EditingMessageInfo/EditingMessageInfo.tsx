import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@components/common/Button/Button';
import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import type { IEditingMessageInfoProps } from '@interfaces/IEditingMessageInfoProps';

import { IconId } from '@enums/iconsSpriteId';

const EditingMessageInfo: FC<IEditingMessageInfoProps> = ({
  selectedMessage,
  handleCancelEditingMessage,
}) => {
  const { t } = useTranslation();

  return (
    <div className="relative ml-3 mr-16 flex items-center gap-3 rounded-3xl bg-mediumLightZinc px-5 dark:bg-darkBackground">
      <SvgIcon
        className="fill-darkZinc dark:fill-white"
        iconId={IconId.IconPencil}
        size={20}
      />
      <div>
        <p className="flex text-mediumDarkViolet">
          {t('ChatForm.EditMessage')}
        </p>
        <p className="max-w-[60%] overflow-hidden text-ellipsis whitespace-nowrap text-black dark:text-white lg:max-w-[85]">
          {selectedMessage.data().message || t('ChatForm.EmptyMessage')}
        </p>
      </div>
      <div className="absolute right-12 top-0">
        <Button
          variant="close"
          type="button"
          onClick={handleCancelEditingMessage}
          ariaLabel="Close"
        >
          <SvgIcon
            className="fill-darkZinc transition-all duration-300 group-hover:fill-darkGreen dark:fill-white"
            iconId={IconId.IconCrossClose}
            size={16}
          />
        </Button>
      </div>
    </div>
  );
};

export default EditingMessageInfo;
