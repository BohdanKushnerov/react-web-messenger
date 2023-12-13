import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const SidebarPage: FC = () => {
  const { t } = useTranslation();

  return (
      <div className="relative w-full">
        <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-gray-700 rounded-xl text-center text-white font-black">
          {t('EmptyChatNofify')}
        </h2>
      </div>
  );
};

export default SidebarPage;
