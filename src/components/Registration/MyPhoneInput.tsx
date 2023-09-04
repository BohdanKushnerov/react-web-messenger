import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { E164Number } from 'libphonenumber-js';

interface MyPhoneInputProps {
  phone: E164Number;
  setPhone: (value: E164Number) => void;
}

export default function MyPhoneInput({ phone, setPhone }: MyPhoneInputProps): JSX.Element {
  return (
    <PhoneInput
      containerStyle={{
        height: 50,
      }}
      inputStyle={{
        width: '100%',
        backgroundColor: '#1F2025',
        border: '1px solid #35363B',
        height: 50,
        color: 'white',
        wordSpacing: 1.5,
      }}
      buttonStyle={{
        backgroundColor: '#1F2025',
        border: '1px solid #35363B',
      }}
      country={'ua'}
      value={phone}
      onChange={setPhone}
    />
  );
}