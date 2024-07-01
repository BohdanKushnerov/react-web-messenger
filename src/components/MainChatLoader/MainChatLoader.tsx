import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import RingLoader from 'react-spinners/RingLoader';

import useChatStore from '@store/store';

import { defaultNS } from '@i18n/i18n';

const MainChatLoader: FC = () => {
  const { t } = useTranslation(defaultNS, { keyPrefix: 'Auth' });

  const isLoggedIn = useChatStore(state => state.isLoggedIn);

  return (
    isLoggedIn === null && (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-loader-bcg bg-cover bg-bottom">
        <RingLoader
          color={'rgb(180 83 9)'}
          size={250}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <h1 className="font-bold text-veryLightZinc">{t('Loading')}</h1>
      </div>
    )
  );
};

export default MainChatLoader;
