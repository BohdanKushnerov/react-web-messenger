import { ConfirmationResult } from "firebase/auth";

const handleSubmitVerifyCode = async (e: React.FormEvent,confirmationResult: ConfirmationResult | null, code: string ) => {
  e.preventDefault();

  if (confirmationResult) {
    try {
      // console.log('confirmationResult', confirmationResult);
      // console.log('code', code);
      const userCredential = await confirmationResult.confirm(code);
      console.log(userCredential);
    } catch (error) {
      console.log('setVerifyCode error', error);
    }
  }
};

export default handleSubmitVerifyCode;