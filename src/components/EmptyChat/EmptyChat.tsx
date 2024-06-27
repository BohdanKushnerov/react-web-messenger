import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import type { IEmptyChatProps } from '@interfaces/IEmptyChatProps';

import { defaultNS } from '@i18n/i18n';

const EmptyChat: FC<IEmptyChatProps> = ({ isShowNotifyMsg }) => {
  const { t } = useTranslation(defaultNS, { keyPrefix: 'General' });

  return (
    <>
      {isShowNotifyMsg && (
        <div className="relative h-full w-full overflow-hidden bg-transparent xl:flex xl:flex-col xl:items-center">
          <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-mediumDarkZinc p-4 text-center font-black text-white">
            {t('EmptyChatNotify')}
          </h2>
        </div>
      )}
    </>
  );
};

export default EmptyChat;
