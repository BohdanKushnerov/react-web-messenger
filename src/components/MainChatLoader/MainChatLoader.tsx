import { FC } from 'react';
import RingLoader from 'react-spinners/RingLoader';

import useChatStore from '@zustand/store';

const MainChatLoader: FC = () => {
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
        <h1 className="font-bold text-veryLightZinc">
          Waiting messenger is loading...
        </h1>
      </div>
    )
  );
};

export default MainChatLoader;
