import { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import AuthConfirmButton from '@components/Buttons/ButtonAuthConfirm/ButtonAuthConfirm';
import MyPhoneInput from '@components/Inputs/MyPhoneInput/MyPhoneInput';
import { auth } from '@myfirebase/config';
import isValidPhoneNumber from '@utils/auth/isValidPhoneNumber';
import setUpRecaptcha from '@utils/auth/setUpRecaptcha';
import { IStepOneProps } from '@interfaces/IStepOneProps';
import authStep1 from '@assets/auth-step1.webp';

const StepOne: FC<IStepOneProps> = ({
  isLoading,
  phone,
  setPhone,
  setStep,
  setIsLoading,
  setConfirmationResult,
}) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const { t } = useTranslation('translation', { keyPrefix: 'Auth' });

  const handleSubmitPhone = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!isValidPhoneNumber(`+${phone}`)) {
      toast.error(t('InvalidPhoneNumber'));
      return;
    }

    try {
      setIsLoading(true);
      const response = await setUpRecaptcha(phone, auth);
      setStep('Step 2/3');

      setConfirmationResult(response);
    } catch (error) {
      toast.error(String(error));
      toast.error(t('ReloadPage'));
    } finally {
      setIsLoading(false);
    }
  };

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

      <form
        ref={formRef}
        onSubmit={handleSubmitPhone}
        className="flex flex-col gap-1"
      >
        <MyPhoneInput phone={phone} setPhone={setPhone} />
        <AuthConfirmButton isLoading={isLoading} />
      </form>
    </>
  );
};

export default StepOne;
