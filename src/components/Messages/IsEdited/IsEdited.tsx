import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { IIsEditedProps } from '@interfaces/IIsEditedProps';
import sprite from '@assets/sprite.svg';

const IsEdited: FC<IIsEditedProps> = ({ isEdited }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'General' });

  return (
    <>
      {isEdited && (
        <>
          <svg width={8} height={8} className="fill-darkZinc">
            <use href={sprite + '#icon-pencil'} />
          </svg>
          <p className="text-sm text-darkZinc">{t('Edited')}</p>
        </>
      )}
    </>
  );
};

export default IsEdited;
