import RingLoader from 'react-spinners/RingLoader';
import useChatStore from '@zustand/store';

function MainChatLoader() {
  const isLoggedIn = useChatStore(state => state.isLoggedIn);

  return (
    isLoggedIn === null && (
      <>
        <div className="flex flex-col justify-center items-center bg-loader-bcg bg-cover bg-bottom h-screen w-full">
          <RingLoader
            color={'rgb(180 83 9)'}
            size={250}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <h1 className="font-bold text-gray-200">
            Waiting messenger is loading...
          </h1>
        </div>
      </>
    )
  );
}

export default MainChatLoader;
