import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import useIsOnlineStatus from '@hooks/useIsOnlineStatus';

import type { IIsOnlineUserProps } from '@interfaces/IIsOnlineUserProps';

import { defaultNS } from '@i18n/i18n';

const IsOnlineUser: FC<IIsOnlineUserProps> = ({ userUID }) => {
  const { t } = useTranslation(defaultNS, { keyPrefix: 'General' });

  const isOnline = useIsOnlineStatus(userUID);

  return (
    <div className={`${isOnline ? 'text-veryDarkGreen' : 'text-veryDarkRed'}`}>
      {isOnline ? t('Online') : t('Offline')}
    </div>
  );
};

export default IsOnlineUser;
