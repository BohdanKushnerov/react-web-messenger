import type { FC } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import type { ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';

import StepOne from '@components/Auth/StepOne/StepOne';
import StepThree from '@components/Auth/StepThree/StepThree';
import StepTwo from '@components/Auth/StepTwo/StepTwo';
import TestNumbers from '@components/Auth/TestNumbers/TestNumbers';
import LanguageSwitcher from '@components/Sidebar/LanguageSwitcher/LanguageSwitcher';
import Theme from '@components/Sidebar/Theme/Theme';
import Button from '@components/common/Button/Button';
import LoaderUIActions from '@components/common/LoaderUIActions/LoaderUIActions';

import { auth } from '@myfirebase/config';

import useStoredConfirmationResult from '@hooks/useStoredConfirmationResult';

import getStoredAuthStep from '@utils/auth/getStoredAuthStep';
import getStoredPhone from '@utils/auth/getStoredPhone';
import handleSubmitVerifyCode from '@utils/auth/handleSubmitVerifyCode';
import isValidPhoneNumber from '@utils/auth/isValidPhoneNumber';
import setUpRecaptcha from '@utils/auth/setUpRecaptcha';

import { ElementsId } from '@enums/elementsId';

import type { AuthSteps } from 'types/AuthSteps';

import { defaultNS } from '@i18n/i18n';

const Auth: FC = () => {
  const [step, setStep] = useState<AuthSteps>(getStoredAuthStep());
  const [phone, setPhone] = useState<string>(getStoredPhone());
  const [code, setCode] = useState('');
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [recaptcha, setRecaptcha] = useState<RecaptchaVerifier | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation(defaultNS, { keyPrefix: 'Auth' });

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
      console.error('handleSubmitPhone', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManageVerifyCode = async (e: React.FormEvent) => {
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
      console.error('handleManageVerifyCode', error);
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
      handleManageVerifyCode(e);
    }
  };

  const handleFullResetFrom = () => {
    localStorage.removeItem('phone');
    localStorage.removeItem('step');
    localStorage.removeItem('_grecaptcha');

    window.location.reload();
  };

  return (
    <div className="relative flex h-full flex-col gap-2 bg-main-bcg bg-cover bg-center bg-no-repeat py-10">
      <div className="mx-auto h-full max-w-300px rounded-md bg-main dark:bg-mainBlack">
        <Theme />
        <LanguageSwitcher />
      </div>
      <p className="text-center font-bold text-white">
        {t('Step')} {step.split(' ')[1]}
      </p>
      <div className="relative mx-auto my-0 min-w-240px max-w-320px rounded-md bg-main p-4 dark:bg-mainBlack">
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
          <Button
            variant="authConfirm"
            id={ElementsId.SignInButton}
            type="button"
            disabled={isLoading}
            onClick={handleSubmitAuthFirstTwoSteps}
            ariaLabel="Auth confirm button"
          >
            {isLoading ? <LoaderUIActions /> : t('Continue')}
          </Button>
        )}

        {step === 'Step 3/3' && (
          <StepThree isLoading={isLoading} setIsLoading={setIsLoading} />
        )}

        <Button
          variant="clearRegistrationForm"
          type="button"
          onClick={handleFullResetFrom}
          ariaLabel="Full reset from"
        >
          {t('ClearRegistrationForm')}
        </Button>
      </div>

      {step !== 'Step 3/3' && <TestNumbers />}
    </div>
  );
};

export default Auth;
