import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { IEmptyChatProps } from '@interfaces/IEmptyChatProps';

const EmptyChat: FC<IEmptyChatProps> = ({ isShowNotifyMsg }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'General' });

  return (
    <>
      {isShowNotifyMsg && (
        <div className="relative h-full w-full xl:flex xl:flex-col xl:items-center bg-transparent overflow-hidden">
          <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-mediumDarkZinc rounded-xl text-center text-white font-black">
            {t('EmptyChatNotify')}
          </h2>
        </div>
      )}
    </>
  );
};

export default EmptyChat;
