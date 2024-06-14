import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import CodeInput from '@components/Inputs/CodeInput/CodeInput';
import { auth } from '@myfirebase/config';
import useAuthResendVerifyCode from '@hooks/useAuthResendVerifyCode';
import setUpRecaptcha from '@utils/auth/setUpRecaptcha';
import { IStepTwoProps } from '@interfaces/IStepTwoProps';
import authStep2 from '@assets/auth-step2.webp';
import convertTimeWithZero from '@utils/convertTimeWithZero';

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
      <h1 className="font-bold text-black dark:text-white text-center">
        {t('Verification')}
      </h1>
      <p className="text-veryDarkGray text-center">{t('EnterDigits')}</p>

      <div className="mb-2">
        <CodeInput setCode={setCode} />
      </div>
      <div className="flex justify-center mb-2">
        <button
          className="w-full p-2 text-black dark:text-white border border-black dark:border-white rounded-md disabled:text-mediumGray disabled:border-mediumGray disabled:dark:text-veryDarkGray disabled:dark:border-mediumGray"
          onClick={getCodeAgain}
          disabled={isButtonDisabled}
        >
          {t('ResendSMS')} {timer !== 0 && convertTimeWithZero(timer)}
        </button>
      </div>
    </>
  );
};

export default StepTwo;
