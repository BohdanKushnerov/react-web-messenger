import { FC, useState } from 'react';
import { ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import StepOne from '@components/Auth/StepOne/StepOne';
import StepTwo from '@components/Auth/StepTwo/StepTwo';
import StepThree from '@components/Auth/StepThree/StepThree';
import AuthConfirmButton from '@components/Buttons/ButtonAuthConfirm/ButtonAuthConfirm';
import LanguageSwitcher from '@components/Sidebar/ProfileSettings/LanguageSwitcher/LanguageSwitcher';
import Theme from '@components/Sidebar/Theme/Theme';
import TestNumbers from '@components/Auth/TestNumbers/TestNumbers';
import { auth } from '@myfirebase/config';
import useStoredConfirmationResult from '@hooks/useStoredConfirmationResult';
import getStoredPhone from '@utils/auth/getStoredPhone';
import getStoredAuthStep from '@utils/auth/getStoredAuthStep';
import setUpRecaptcha from '@utils/auth/setUpRecaptcha';
import isValidPhoneNumber from '@utils/auth/isValidPhoneNumber';
import handleSubmitVerifyCode from '@utils/auth/handleSubmitVerifyCode';
import { AuthSteps } from 'types/AuthSteps';

const Auth: FC = () => {
  const [step, setStep] = useState<AuthSteps>(getStoredAuthStep());
  const [phone, setPhone] = useState<string>(getStoredPhone());
  const [code, setCode] = useState('');
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [recaptcha, setRecaptcha] = useState<RecaptchaVerifier | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation('translation', { keyPrefix: 'Auth' });

  useStoredConfirmationResult(
    step,
    setConfirmationResult,
    recaptcha,
    setRecaptcha
  );

  const handleManageSubmitPhone = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!isValidPhoneNumber(phone)) {
      toast.error(t('InvalidPhoneNumber'));
      return;
    }

    try {
      setIsLoading(true);
      const response = await setUpRecaptcha(
        phone,
        auth,
        recaptcha,
        setRecaptcha,
        t
      );
      setStep('Step 2/3');

      setConfirmationResult(response);

      localStorage.setItem('phone', phone);
      localStorage.setItem('step', 'Step 2/3');
    } catch (error) {
      toast.error(t('ReloadPage'));
      console.log('handleSubmitPhone error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMannageVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const userCredential = await handleSubmitVerifyCode(
        confirmationResult,
        code
      );

      if (userCredential) {
        if (userCredential.user.displayName?.trim()) {
          return;
        } else {
          setStep('Step 3/3');

          localStorage.removeItem('phone');
          localStorage.setItem('step', 'Step 3/3');
        }
      }
    } catch (error) {
      toast.error(t('InvalidVerificationCode'));
      console.log('handleMannageVerifyCode error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitAuthFirstTwoSteps = async (
    e: React.FormEvent
  ): Promise<void> => {
    if (step === 'Step 1/3') {
      handleManageSubmitPhone(e);
    } else if (step === 'Step 2/3') {
      handleMannageVerifyCode(e);
    }
  };

  const handleFullResetFrom = () => {
    localStorage.removeItem('phone');
    localStorage.removeItem('step');
    localStorage.removeItem('_grecaptcha');

    window.location.reload();
  };

  return (
    <div className="relative flex flex-col gap-2 h-full py-10 bg-main-bcg bg-no-repeat bg-cover bg-center">
      <div className="h-full bg-main dark:bg-mainBlack max-w-[300px] mx-auto rounded-md">
        <Theme />
        <LanguageSwitcher />
      </div>
      <p className="text-white font-bold text-center">
        {t('Step')} {step.split(' ')[1]}
      </p>
      <div className="relative bg-main dark:bg-mainBlack min-w-240px max-w-320px mx-auto my-0 p-4 rounded-md">
        {step === 'Step 1/3' && <StepOne phone={phone} setPhone={setPhone} />}

        {step === 'Step 2/3' && (
          <StepTwo
            phone={phone}
            recaptcha={recaptcha}
            setCode={setCode}
            setConfirmationResult={setConfirmationResult}
            setRecaptcha={setRecaptcha}
          />
        )}

        {step !== 'Step 3/3' && (
          <AuthConfirmButton
            isLoading={isLoading}
            onSubmit={handleSubmitAuthFirstTwoSteps}
          />
        )}

        {step === 'Step 3/3' && (
          <StepThree isLoading={isLoading} setIsLoading={setIsLoading} />
        )}

        <button
          className="w-full mt-2 p-2 rounded-md bg-mediumRed text-white font-bold disabled:text-veryDarkZinc"
          onClick={handleFullResetFrom}
        >
          {t('ClearRegistrationForm')}
        </button>
      </div>

      {step !== 'Step 3/3' && <TestNumbers />}
    </div>
  );
};

export default Auth;
