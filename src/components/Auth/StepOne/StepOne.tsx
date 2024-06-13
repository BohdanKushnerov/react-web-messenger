import { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import MyPhoneInput from '@components/Inputs/MyPhoneInput/MyPhoneInput';
import { IStepOneProps } from '@interfaces/IStepOneProps';
import authStep1 from '@assets/auth-step1.webp';

const StepOne: FC<IStepOneProps> = ({ phone, setPhone }) => {
  const formRef = useRef<HTMLDivElement | null>(null);

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
      <h1 className="font-bold text-black dark:text-white text-center">
        {t('Registration')}
      </h1>
      <p className="text-textcolor text-center">{t('EnterNumber')}</p>

      <div ref={formRef} className="flex flex-col gap-1">
        <MyPhoneInput phone={phone} setPhone={setPhone} />
      </div>
    </>
  );
};

export default StepOne;
