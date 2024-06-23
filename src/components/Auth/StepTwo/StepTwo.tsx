import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import CodeInput from '@components/Inputs/CodeInput/CodeInput';

import { auth } from '@myfirebase/config';

import useAuthResendVerifyCode from '@hooks/useAuthResendVerifyCode';

import setUpRecaptcha from '@utils/auth/setUpRecaptcha';
import convertTimeWithZero from '@utils/convertTimeWithZero';

import { IStepTwoProps } from '@interfaces/IStepTwoProps';

import authStep2 from '@assets/auth-step2.webp';

const StepTwo: FC<IStepTwoProps> = ({
  phone,
  recaptcha,
  setCode,
  setConfirmationResult,
  setRecaptcha,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'Auth' });

  const { timer, isButtonDisabled, handleResetTimer } =
    useAuthResendVerifyCode();

  const getCodeAgain = async () => {
    handleResetTimer();

    const response = await setUpRecaptcha(
      phone,
      auth,
      recaptcha,
      setRecaptcha,
      t
    );

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
      <h1 className="text-center font-bold text-black dark:text-white">
        {t('Verification')}
      </h1>
      <p className="text-center text-veryDarkGray">{t('EnterDigits')}</p>

      <div className="mb-2">
        <CodeInput setCode={setCode} />
      </div>
      <div className="mb-2 flex justify-center">
        <button
          className="w-full rounded-md border border-black p-2 text-black disabled:border-mediumGray disabled:text-mediumGray dark:border-white dark:text-white disabled:dark:border-mediumGray disabled:dark:text-veryDarkGray"
          type="button"
          onClick={getCodeAgain}
          disabled={isButtonDisabled}
          aria-label="Resend SMS"
        >
          {t('ResendSMS')} {timer !== 0 && convertTimeWithZero(timer)}
        </button>
      </div>
    </>
  );
};

export default StepTwo;
