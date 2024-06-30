import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import CodeInput from '@components/Inputs/CodeInput/CodeInput';
import Button from '@components/common/Button/Button';

import { auth } from '@myfirebase/config';

import useAuthResendVerifyCode from '@hooks/useAuthResendVerifyCode';

import setUpRecaptcha from '@utils/auth/setUpRecaptcha';
import convertTimeWithZero from '@utils/convertTimeWithZero';

import type { IStepTwoProps } from '@interfaces/IStepTwoProps';

import authStep2 from '@assets/auth-step2.webp';

import { defaultNS } from '@i18n/i18n';

const StepTwo: FC<IStepTwoProps> = ({
  phone,
  recaptcha,
  setCode,
  setConfirmationResult,
  setRecaptcha,
}) => {
  const { t } = useTranslation(defaultNS, { keyPrefix: 'Auth' });

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
        <Button
          variant="resendSMS"
          type="button"
          onClick={getCodeAgain}
          disabled={isButtonDisabled}
          ariaLabel="Resend SMS"
        >
          {t('ResendSMS')} {timer !== 0 && convertTimeWithZero(timer)}
        </Button>
      </div>
    </>
  );
};

export default StepTwo;
