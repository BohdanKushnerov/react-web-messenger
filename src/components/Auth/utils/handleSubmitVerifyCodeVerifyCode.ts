import { ConfirmationResult } from 'firebase/auth';

const handleSubmitVerifyCode = (
  confirmationResult: ConfirmationResult | null,
  code: string
) => {
  if (confirmationResult) {
    return confirmationResult.confirm(code);
  }
};

export default handleSubmitVerifyCode;
