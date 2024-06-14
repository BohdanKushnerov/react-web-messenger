import { useTranslation } from 'react-i18next';

const TestNumbers = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'Auth' });

  return (
    <div className="bg-main dark:bg-mainBlack min-w-240px max-w-320px mx-auto rounded-md">
      <div>
        <h2 className="text-black dark:text-white font-bold text-center">
          {t('TestNumber')}: 1
        </h2>
        <p className="text-veryDarkZinc dark:text-mediumGray font-bold text-center">
          +1 650-555-3434
        </p>
        <p className="text-ultraDarkZinc dark:text-mediumGray font-bold text-center">
          <span>{t('Code')}: </span>111111
        </p>
      </div>
      <div>
        <h2 className="text-black dark:text-white font-bold text-center">
          {t('TestNumber')}: 2
        </h2>
        <p className="text-veryDarkZinc dark:text-mediumGray font-bold text-center">
          +1 650-555-3435
        </p>
        <p className="text-ultraDarkZinc dark:text-mediumGray font-bold text-center">
          <span>{t('Code')}: </span>111111
        </p>
      </div>
    </div>
  );
};

export default TestNumbers;
