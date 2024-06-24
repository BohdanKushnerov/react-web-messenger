import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import { IIsEditedProps } from '@interfaces/IIsEditedProps';

import { IconId } from '@enums/iconsSpriteId';

const IsEdited: FC<IIsEditedProps> = ({ isEdited }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'General' });

  return (
    <>
      {isEdited && (
        <div className="flex items-center gap-1">
          <SvgIcon
            className="fill-darkZinc dark:fill-veryLightZinc"
            iconId={IconId.IconPencil}
            size={8}
          />
          <p className="text-sm text-darkZinc dark:text-veryLightZinc">
            {t('Edited')}
          </p>
        </div>
      )}
    </>
  );
};

export default IsEdited;
