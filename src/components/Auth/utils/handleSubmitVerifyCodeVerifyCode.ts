import { ConfirmationResult } from 'firebase/auth';

// import { StepsAuth } from 'types/StepsAuth';

const handleSubmitVerifyCode =  (
  // e: React.FormEvent,
  confirmationResult: ConfirmationResult | null,
  code: string,
  // setStep: React.Dispatch<React.SetStateAction<StepsAuth>>
) => {
  // e.preventDefault();

  if (confirmationResult) {
  //   try {
      // console.log('confirmationResult', confirmationResult);
      // console.log('code', code);
      return confirmationResult.confirm(code);

      // console.log('userCredential', userCredential);
      // if (userCredential) {
      //   if (userCredential.user.displayName) {
      //     return;
      //   } else {
      //     setStep('Step 3/3');
      //   }
      // }
    } 
    // catch (error) {
    //   console.log('setVerifyCode error', error);
    // }
  // }
};

export default handleSubmitVerifyCode;
