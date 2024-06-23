import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import LoaderUIActions from '@components/LoaderUIActions/LoaderUIActions';

import { IAuthConfirmButtonProps } from '@interfaces/IAuthConfirmButtonProps';

import { ElementsId } from '@enums/elementsId';

const AuthConfirmButton: FC<IAuthConfirmButtonProps> = ({
  isLoading,
  onSubmit,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'Auth' });

  return (
    <button
      className="w-full rounded-md bg-mediumDarkCyan p-2 font-bold text-white disabled:text-veryDarkZinc"
      id={ElementsId.SignInButton}
      type="button"
      disabled={isLoading}
      onClick={onSubmit}
      aria-label="Auth confirm button"
    >
      {isLoading ? <LoaderUIActions /> : t('Continue')}
    </button>
  );
};

export default AuthConfirmButton;
