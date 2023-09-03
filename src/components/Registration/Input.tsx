// ================================
// const CustomInput = () => {

//   return (
//     <input className="bg-transparent w-full rounded-md p-2 outline-none text-white" />
//   );
// };

// export default CustomInput;
//]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
import { forwardRef, InputHTMLAttributes } from 'react';

const CustomInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((props, ref) => {

  return (
    <input
      className="bg-transparent w-full rounded-md p-2 outline-none text-white"
      ref={ref}
      {...props}
    />
  );
});

export default CustomInput;