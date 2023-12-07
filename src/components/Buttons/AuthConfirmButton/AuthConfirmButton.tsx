import  { FC } from 'react'
import ButtonLoader from '../ButtonLoader/ButtonLoader';

interface AuthConfirmButton {
  isLoading: boolean
}

const AuthConfirmButton: FC<AuthConfirmButton> = ({ isLoading }) => {
  return (
    <button
      className="w-full p-2 rounded-md bg-myblue text-white font-bold disabled:text-zinc-700"
      id="sign-in-button"
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? <ButtonLoader /> : 'Continue'}
    </button>
  );
};

export default AuthConfirmButton