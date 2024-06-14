import { FC, useState } from 'react';
import { Line } from 'rc-progress';
import { useTranslation } from 'react-i18next';

import ModalWindow from '../ModalWindow/ModalWindow';
import ButtonClose from '@components/Buttons/ButtonClose/ButtonClose';
import useChatStore from '@zustand/store';
import handleUpdateProfilePhoto from '@utils/profileSettings/handleUpdateProfilePhoto';
import { IProfileSettingsModalProps } from '@interfaces/IProfileSettingsModalProps';
import '@i18n';

const ProfileSettingsModal: FC<IProfileSettingsModalProps> = ({
  photoProfileInputRef,
  handleToggleProfilePhotoModal,
}) => {
  const [profilePhotoUploadStatus, setProfilePhotoUploadStatus] = useState<
    number | null
  >(null);
  const { t } = useTranslation('translation', {
    keyPrefix: 'ProfileSettings',
  });

  const { uid, photoURL } = useChatStore(state => state.currentUser);
  const updateCurrentUser = useChatStore(state => state.updateCurrentUser);

  return (
    <ModalWindow handleToggleModal={handleToggleProfilePhotoModal}>
      <div className="h-full flex justify-center items-center">
        <div className="relative w-full sm:w-1/2 xl:w-1/3 h-2/3 flex flex-col gap-6 justify-center items-center bg-main dark:bg-mainBlack rounded-3xl shadow-mainShadow">
          <ButtonClose handleClickButtonClose={handleToggleProfilePhotoModal} />
          {photoProfileInputRef.current?.files && (
            <div className="w-[200px] h-[200px]">
              <img
                className="rounded-full w-full h-full object-cover"
                src={URL.createObjectURL(
                  photoProfileInputRef.current?.files[0]
                )}
                alt={photoProfileInputRef.current?.files[0].name}
                width={200}
                height={200}
              />
            </div>
          )}
          <p className="w-80 text-center text-black dark:text-white text-xs">
            {t('Modal.ChangeProfilePhotoPrompt')}
          </p>
          <button
            className="w-48 border-2 rounded-3xl text-black dark:text-white border-black dark:border-white transition-all duration-300 hover:shadow-mainShadow hover:bg-mediumZinc hover:dark:bg-extraDarkGray disabled:text-darkZinc"
            onClick={() =>
              handleUpdateProfilePhoto(
                photoProfileInputRef,
                uid,
                setProfilePhotoUploadStatus,
                t,
                photoURL,
                updateCurrentUser,
                handleToggleProfilePhotoModal
              )
            }
            aria-label="Update profile photo"
            disabled={typeof profilePhotoUploadStatus === 'number'}
          >
            {t('Modal.ChangeProfilePhoto')}
          </button>

          <div className="flex gap-4 items-center h-4">
            {typeof profilePhotoUploadStatus === 'number' && (
              <>
                <p className="text-black dark:text-white">Loading:</p>
                <Line
                  style={{ width: 150 }}
                  percent={profilePhotoUploadStatus}
                  strokeWidth={6}
                  strokeColor="#5ee987"
                  trailColor="#5f5f5f"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </ModalWindow>
  );
};

export default ProfileSettingsModal;
