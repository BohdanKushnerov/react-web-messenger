import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';

import useIsOnlineStatus from '@hooks/useIsOnlineStatus';

import { defaultNS } from '@i18n/i18n';

interface IIsOnlineUserProps {
  userUID: string;
}

const IsOnlineUser: FC<IIsOnlineUserProps> = ({ userUID }) => {
  const { t } = useTranslation(defaultNS, { keyPrefix: 'General' });

  const isOnline = useIsOnlineStatus(userUID);

  return (
    <div
      className={classNames({
        'text-veryDarkGreen': isOnline,
        'text-veryDarkRed': !isOnline,
      })}
    >
      {isOnline ? t('Online') : t('Offline')}
    </div>
  );
};

export default IsOnlineUser;
