import { useTranslation } from 'react-i18next';

const TestNumbers = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'Auth' });

  return (
    <div className="mx-auto min-w-240px max-w-320px rounded-md bg-main dark:bg-mainBlack">
      <div>
        <h2 className="text-center font-bold text-black dark:text-white">
          {t('TestNumber')}: 1
        </h2>
        <p className="text-center font-bold text-veryDarkZinc dark:text-mediumGray">
          +1 650-555-3434
        </p>
        <p className="text-center font-bold text-ultraDarkZinc dark:text-mediumGray">
          <span>{t('Code')}: </span>111111
        </p>
      </div>
      <div>
        <h2 className="text-center font-bold text-black dark:text-white">
          {t('TestNumber')}: 2
        </h2>
        <p className="text-center font-bold text-veryDarkZinc dark:text-mediumGray">
          +1 650-555-3435
        </p>
        <p className="text-center font-bold text-ultraDarkZinc dark:text-mediumGray">
          <span>{t('Code')}: </span>111111
        </p>
      </div>
    </div>
  );
};

export default TestNumbers;
