import AuthCode from 'react-auth-code-input';

import { ICodeInputProps } from '@interfaces/ICodeInputProps';

const CodeInput = ({ setCode }: ICodeInputProps) => {
  const handleOnChange = (res: string) => {
    setCode(res);
  };

  return (
    <AuthCode
      containerClassName="flex flex-row justify-center gap-3"
      inputClassName="w-10 h-10 font-bold text-center text-white outline-none bg-transparent border-b-4 border-inputChar focus:border-blue-500"
      allowedCharacters="numeric"
      onChange={handleOnChange}
    />
  );
};

export default CodeInput;
