import { Dispatch, SetStateAction } from 'react';

export interface IStepThreeProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
