import type { FC } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Line } from 'rc-progress';

import ModalWindow from '../ModalWindow/ModalWindow';

import Button from '@components/common/Button/Button';
import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import useChatStore from '@store/store';

import handleUpdateProfilePhoto from '@utils/profileSettings/handleUpdateProfilePhoto';

import type { IProfileSettingsModalProps } from '@interfaces/IProfileSettingsModalProps';

import { IconId } from '@enums/iconsSpriteId';

import { defaultNS } from '@i18n/i18n';

const ProfileSettingsModal: FC<IProfileSettingsModalProps> = ({
  photoProfileInputRef,
  handleToggleProfilePhotoModal,
}) => {
  const [profilePhotoUploadStatus, setProfilePhotoUploadStatus] = useState<
    number | null
  >(null);

  const { t } = useTranslation(defaultNS, {
    keyPrefix: 'ProfileSettings',
  });

  const { uid, photoURL } = useChatStore(state => state.currentUser);
  const updateCurrentUser = useChatStore(state => state.updateCurrentUser);

  return (
    <ModalWindow handleToggleModal={handleToggleProfilePhotoModal}>
      <div className="flex h-full items-center justify-center">
        <div className="relative flex h-2/3 w-full flex-col items-center justify-center gap-6 rounded-3xl bg-main shadow-mainShadow dark:bg-mainBlack sm:w-1/2 xl:w-1/3">
          <Button
            variant="close"
            type="button"
            onClick={handleToggleProfilePhotoModal}
            ariaLabel="Close"
          >
            <SvgIcon
              className="fill-darkZinc transition-all duration-300 group-hover:fill-darkGreen dark:fill-white"
              iconId={IconId.IconCrossClose}
              size={16}
            />
          </Button>
          {photoProfileInputRef.current?.files && (
            <div className="h-200px w-200px">
              <img
                className="h-full w-full rounded-full object-cover"
                src={URL.createObjectURL(
                  photoProfileInputRef.current?.files[0]
                )}
                alt={photoProfileInputRef.current?.files[0].name}
                width={200}
                height={200}
              />
            </div>
          )}
          <p className="w-80 text-center text-xs text-black dark:text-white">
            {t('Modal.ChangeProfilePhotoPrompt')}
          </p>
          <Button
            variant="updateProfilePhoto"
            type="button"
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
            ariaLabel="Update profile photo"
            disabled={typeof profilePhotoUploadStatus === 'number'}
          >
            {t('Modal.ChangeProfilePhoto')}
          </Button>

          <div className="flex h-4 items-center gap-4">
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
