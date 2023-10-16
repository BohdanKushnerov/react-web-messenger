// import { useState } from 'react';
import Avatar from 'react-avatar';

import useChatStore from '@zustand/store';
import { auth } from '@myfirebase/config';

function ProfileSettings() {
  // const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(false);

  const { displayName } = useChatStore(state => state.currentUser);
  const setSidebarScreen = useChatStore(state => state.setSidebarScreen);

  const handleClickTurnBackToDefaultScreen = () => {
    setSidebarScreen('default');
  };

  console.log();
  return (
    <>
      <button
        className="flex justify-center items-center w-12 h-12 text-white hover:bg-hoverGray rounded-full cursor-pointer"
        onClick={handleClickTurnBackToDefaultScreen}
      >
        <svg
          className="rotate-180"
          fill="rgb(170,170,170)"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="25px"
          height="25px"
          viewBox="0 0 44.952 44.952"
          xmlSpace="preserve"
        >
          <g>
            <path
              d="M44.952,22.108c0-1.25-0.478-2.424-1.362-3.308L30.627,5.831c-0.977-0.977-2.561-0.977-3.536,0
		c-0.978,0.977-0.976,2.568,0,3.546l10.574,10.57H2.484C1.102,19.948,0,21.081,0,22.464c0,0.003,0,0.025,0,0.028
		c0,1.382,1.102,2.523,2.484,2.523h35.182L27.094,35.579c-0.978,0.978-0.978,2.564,0,3.541c0.977,0.979,2.561,0.978,3.538-0.001
		l12.958-12.97c0.885-0.882,1.362-2.059,1.362-3.309C44.952,22.717,44.952,22.231,44.952,22.108z"
            />
          </g>
        </svg>
      </button>
      <div className="flex flex-col justify-center items-center gap-4">
        {displayName && (
          <Avatar className="rounded-full" name={`${displayName}`} size="100" />
        )}
        <div className="text-white">
          <p>{auth?.currentUser?.phoneNumber}</p>
          <p>Number</p>
        </div>
        <div className="text-white">
          <p>{displayName}</p>
          <p>UserName</p>
        </div>
      </div>
    </>
  );
}

export default ProfileSettings;
