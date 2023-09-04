import { ConfirmationResult } from "firebase/auth";

type Steps = 'Step 1/3' | 'Step 2/3' | 'Step 3/3'

const handleSubmitVerifyCode = async (e: React.FormEvent,confirmationResult: ConfirmationResult | null, code: string, setStep: React.Dispatch<React.SetStateAction<Steps>> ) => {
  e.preventDefault();

  if (confirmationResult) {
    try {
      // console.log('confirmationResult', confirmationResult);
      // console.log('code', code);
      const userCredential = await confirmationResult.confirm(code);
      console.log("userCredential", userCredential);
      if(userCredential) setStep('Step 3/3')
    } catch (error) {
      console.log('setVerifyCode error', error);
    }
  }
};

export default handleSubmitVerifyCode;