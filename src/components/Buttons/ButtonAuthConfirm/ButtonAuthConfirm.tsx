import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import LoaderUIActions from '@components/LoaderUIActions/LoaderUIActions';
import { IAuthConfirmButtonProps } from '@interfaces/IAuthConfirmButtonProps';

const AuthConfirmButton: FC<IAuthConfirmButtonProps> = ({ isLoading, onSubmit }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'Auth' });

  return (
    <button
      className="w-full p-2 rounded-md bg-myblue text-white font-bold disabled:text-zinc-700"
      id="sign-in-button"
      type="button"
      aria-label="Auth confirm button"
      disabled={isLoading}
      onClick={onSubmit}
    >
      {isLoading ? <LoaderUIActions /> : t('Continue')}
    </button>
  );
};

export default AuthConfirmButton;
