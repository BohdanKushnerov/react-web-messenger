import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import ButtonClose from '@components/Buttons/ButtonClose/ButtonClose';

import { IEditingMsgInfoProps } from '@interfaces/IEditingMsgInfoProps';

import sprite from '@assets/sprite.svg';

import '@i18n';

const EditingMsgInfo: FC<IEditingMsgInfoProps> = ({
  selectedMessage,
  handleCancelEditingMessage,
}) => {
  const { t } = useTranslation();

  return (
    <div className="relative ml-3 mr-16 flex items-center gap-3 rounded-3xl bg-mediumLightZinc px-5 dark:bg-darkBackground">
      <svg width={20} height={20} className="fill-darkZinc dark:fill-white">
        <use href={sprite + '#icon-pencil'} />
      </svg>
      <div>
        <p className="flex text-mediumDarkViolet">
          {t('ChatForm.EditMessage')}
        </p>
        <p className="max-w-[65%] overflow-hidden text-ellipsis whitespace-nowrap text-black dark:text-white lg:max-w-[85]">
          {selectedMessage.data().message || t('ChatForm.EmptyMessage')}
        </p>
      </div>
      <div className="absolute right-12 top-0">
        <ButtonClose handleClickButtonClose={handleCancelEditingMessage} />
      </div>
    </div>
  );
};

export default EditingMsgInfo;
