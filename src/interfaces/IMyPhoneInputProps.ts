import { E164Number } from 'libphonenumber-js';

export interface IMyPhoneInputProps {
  phone: E164Number;
  setPhone: (value: E164Number) => void;
}
