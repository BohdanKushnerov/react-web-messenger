import { FC, useState } from 'react';
import { ConfirmationResult } from 'firebase/auth';
import { useTranslation } from 'react-i18next';

import StepOne from '@components/Auth/StepOne/StepOne';
import StepTwo from '@components/Auth/StepTwo/StepTwo';
import StepThree from '@components/Auth/StepThree/StepThree';
import ButtonArrow from '@components/Buttons/ButtonArrow/ButtonArrow';
import LanguageSwitcher from '@components/Sidebar/ProfileSettings/LanguageSwitcher/LanguageSwitcher';
import Theme from '@components/Sidebar/Theme/Theme';
import { AuthSteps } from 'types/AuthSteps';

const Auth: FC = () => {
  const [step, setStep] = useState<AuthSteps>('Step 1/3');
  const [phone, setPhone] = useState<string>('');
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation('translation', { keyPrefix: 'Auth' });

  const handleClickBackOneStep = () => {
    if (step === 'Step 2/3') {
      setStep('Step 1/3');
    } else if (step === 'Step 3/3') {
      setStep('Step 2/3');
    }
  };

  return (
    <div className="relative flex flex-col gap-2 bg-main-bcg bg-no-repeat bg-cover bg-center h-full">
      <div className="bg-gray-200 dark:bg-myBlackBcg max-w-[300px] mx-auto">
        <Theme />
        <LanguageSwitcher />
      </div>
      <p className="text-white font-bold text-center">
        {t('Step')} {step.split(' ')[1]}
      </p>
      <div className="bg-gray-200 dark:bg-myBlackBcg min-w-240px max-w-320px mx-auto my-0 p-4 rounded-md">
        {step !== 'Step 1/3' && (
          <ButtonArrow handleClickButtonArrow={handleClickBackOneStep} />
        )}

        {step === 'Step 1/3' && (
          <StepOne
            isLoading={isLoading}
            phone={phone}
            setPhone={setPhone}
            setStep={setStep}
            setIsLoading={setIsLoading}
            setConfirmationResult={setConfirmationResult}
          />
        )}

        {step === 'Step 2/3' && (
          <StepTwo
            phone={phone}
            isLoading={isLoading}
            confirmationResult={confirmationResult}
            setIsLoading={setIsLoading}
            setStep={setStep}
            setConfirmationResult={setConfirmationResult}
          />
        )}

        {step === 'Step 3/3' && (
          <StepThree isLoading={isLoading} setIsLoading={setIsLoading} />
        )}
      </div>

      {step === 'Step 1/3' && (
        <div className="bg-gray-200 dark:bg-myBlackBcg min-w-240px max-w-320px mx-auto rounded-md">
          <div>
            <h2 className="text-black dark:text-white font-bold text-center">
              {t('TestNumber')}: 1
            </h2>
            <p className="text-zinc-700 dark:text-gray-400 font-bold text-center">
              +1 650-555-3434
            </p>
            <p className="text-zinc-900 dark:text-gray-400 font-bold text-center">
              <span>{t('Code')}: </span>111111
            </p>
          </div>
          <div>
            <h2 className="text-black dark:text-white font-bold text-center">
              {t('TestNumber')}: 2
            </h2>
            <p className="text-zinc-700 dark:text-gray-400 font-bold text-center">
              +1 650-555-3435
            </p>
            <p className="text-zinc-900 dark:text-gray-400 font-bold text-center">
              <span>{t('Code')}: </span>111111
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
