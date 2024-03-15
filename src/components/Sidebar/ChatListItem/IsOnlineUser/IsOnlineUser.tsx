import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import useIsOnlineStatus from '@hooks/useIsOnlineStatus';
import { ChatListItemType } from 'types/ChatListItemType';
import '@i18n';

interface IIsOnlineUserProps {
  chatInfo: ChatListItemType;
}

const IsOnlineUser: FC<IIsOnlineUserProps> = ({ chatInfo }) => {
  const { t } = useTranslation();

  const isOnline = useIsOnlineStatus(chatInfo[1].userUID); // следим за состоянием онлайн/офлайн

  // console.log('screen --> IsOnlineUser');

  return (
    <div className={`${isOnline ? 'text-green-700' : 'text-red-700'}`}>
      {isOnline ? t('Online') : t('Offline')}
    </div>
  );
};

export default IsOnlineUser;
