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
    <div className="relative flex items-center gap-3 ml-3 mr-16 px-5 rounded-3xl bg-mediumLightZinc dark:bg-darkBackground">
      <svg width={20} height={20} className="fill-darkZinc dark:fill-white">
        <use href={sprite + '#icon-pencil'} />
      </svg>
      <div>
        <p className="flex text-mediumDarkViolet">
          {t('ChatForm.EditMessage')}
        </p>
        <p className="text-black dark:text-white">
          {selectedMessage.data().message || t('ChatForm.EmptyMessage')}
        </p>
      </div>
      <div className="absolute top-0 right-12">
        <ButtonClose handleClickButtonClose={handleCancelEditingMessage} />
      </div>
    </div>
  );
};

export default EditingMsgInfo;
