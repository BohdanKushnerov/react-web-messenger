import { FC } from 'react';
import AuthCode from 'react-auth-code-input';

import { ICodeInputProps } from '@interfaces/ICodeInputProps';

const CodeInput: FC<ICodeInputProps> = ({ setCode }) => {
  const handleOnChange = (res: string) => {
    setCode(res);
  };

  return (
    <AuthCode
      autoFocus={true}
      containerClassName="flex flex-row justify-center gap-3"
      inputClassName="w-full h-10 font-bold text-center text-black dark:text-white outline-none bg-transparent border-b-4 border-charcoal focus:border-mediumDarkBlue"
      allowedCharacters="numeric"
      onChange={handleOnChange}
    />
  );
};

export default CodeInput;
