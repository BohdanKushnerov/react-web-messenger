import { FC, useState } from 'react';
import { toast } from 'react-toastify';

import AuthConfirmButton from '@components/Buttons/ButtonAuthConfirm/ButtonAuthConfirm';
import CodeInput from '@components/Inputs/CodeInput/CodeInput';
import { auth } from '@myfirebase/config';
import handleSubmitVerifyCode from '@utils/auth/handleSubmitVerifyCode';
import setUpRecaptcha from '@utils/auth/setUpRecaptcha';
import { IStepTwoProps } from '@interfaces/IStepTwoProps';
import authStep2 from '@assets/auth-step2.webp';
import { useTranslation } from 'react-i18next';

const StepTwo: FC<IStepTwoProps> = ({
  phone,
  isLoading,
  confirmationResult,
  setIsLoading,
  setStep,
  setConfirmationResult,
}) => {
  const [code, setCode] = useState('');

  const { t } = useTranslation('translation', { keyPrefix: 'Auth' });

  const handleMannageVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const userCredential = await handleSubmitVerifyCode(
        confirmationResult,
        code
      );

      if (userCredential) {
        if (userCredential.user.displayName) {
          return;
        } else {
          setStep('Step 3/3');
        }
      }
    } catch (error) {
      console.log('handleMannageVerifyCode error', error);
      toast.error(String(error));
    } finally {
      setIsLoading(false);
    }
  };

  const getCodeAgain = async () => {
    const response = await setUpRecaptcha(phone, auth);
    setStep('Step 2/3');

    setConfirmationResult(response);
  };

  return (
    <>
      <img
        className="mx-auto mb-10 rounded-md"
        src={authStep2}
        alt="phone"
        width={120}
        height={120}
      />
      <h1 className="font-bold text-white text-center">{t('Verification')}</h1>
      <p className="text-textcolor text-center">{t('EnterDigits')}</p>

      <form onSubmit={handleMannageVerifyCode} className="flex flex-col gap-1">
        <CodeInput setCode={setCode} />
        <AuthConfirmButton isLoading={isLoading} />
      </form>
      <button className="border border-white text-white" onClick={getCodeAgain}>
        get one more time
      </button>
    </>
  );
};

export default StepTwo;
