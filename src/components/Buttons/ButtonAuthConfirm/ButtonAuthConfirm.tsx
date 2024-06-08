import { FC } from 'react';

import LoaderUIActions from '@components/LoaderUIActions/LoaderUIActions';
import { IAuthConfirmButtonProps } from '@interfaces/IAuthConfirmButtonProps';

const AuthConfirmButton: FC<IAuthConfirmButtonProps> = ({ isLoading }) => {
  return (
    <button
      className="w-full p-2 rounded-md bg-myblue text-white font-bold disabled:text-zinc-700"
      id="sign-in-button"
      type="submit"
      aria-label="Auth confirm button"
      disabled={isLoading}
    >
      {isLoading ? <LoaderUIActions /> : 'Continue'}
    </button>
  );
};

export default AuthConfirmButton;
