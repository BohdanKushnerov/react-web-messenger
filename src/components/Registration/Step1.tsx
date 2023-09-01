import { useState } from 'react';

export default function Step1() {
  const [phone, setPhone] = useState('');

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>):void => {
    const {value} = e.target
    setPhone(value)
  }

  const handleSubmitPhone = (e: React.FormEvent):void => {
    e.preventDefault();
    console.log("phone", phone)
  }

  return (
    <div>
      <div className="bg-white w-96 h-96 mx-auto my-0 p-4">
        <img
          className="mx-auto mb-10"
          src="/src/assets/phone.jpg"
          alt="phone"
          width={100}
          height={100}
        />
        <h1 className="font-bold font">Registration</h1>
        <p>Enter your phone number and we will send you a confirmation code</p>
        <form onSubmit={handleSubmitPhone}>
          <input className="border-black border-2 w-full" value={phone} onChange={handleChangePhone}/>
          <button className="rounded-full bg-slate-500" type="submit">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
