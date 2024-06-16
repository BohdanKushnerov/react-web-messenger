import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import MyPhoneInput from '@components/Inputs/MyPhoneInput/MyPhoneInput';

import { IStepOneProps } from '@interfaces/IStepOneProps';

import authStep1 from '@assets/auth-step1.webp';

const StepOne: FC<IStepOneProps> = ({ phone, setPhone }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'Auth' });

  return (
    <>
      <img
        className="mx-auto mb-10 rounded-md"
        src={authStep1}
        alt="phone"
        width={120}
        height={120}
      />
      <h1 className="text-center font-bold text-black dark:text-white">
        {t('Registration')}
      </h1>
      <p className="text-center text-veryDarkGray">{t('EnterNumber')}</p>

      <div className="mb-2">
        <MyPhoneInput phone={phone} setPhone={setPhone} />
      </div>
    </>
  );
};

export default StepOne;
