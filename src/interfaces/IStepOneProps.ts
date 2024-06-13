import { Dispatch, SetStateAction } from 'react';

export interface IStepOneProps {
  phone: string;
  setPhone: Dispatch<SetStateAction<string>>;
}
