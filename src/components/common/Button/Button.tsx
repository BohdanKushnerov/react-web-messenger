import { type FC, type ReactNode } from 'react';

import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

const buttonStyles = cva('', {
  variants: {
    variant: {
      authConfirm:
        'w-full rounded-md bg-mediumDarkCyan p-2 font-bold text-white disabled:text-veryDarkZinc',
      attachFileToMessage:
        'absolute right-16 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-transparent transition-all duration-300 hover:bg-mediumZinc hover:dark:bg-veryLightZincOpacity10',
      recording:
        'flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-transparent transition-all duration-300 hover:bg-veryLightZincOpacity20 hover:dark:bg-veryLightZincOpacity10',
      comeBack:
        'flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-white transition-all duration-300 hover:bg-mediumZinc hover:dark:bg-veryLightZincOpacity10',
      stopPlayRecording:
        'my-3 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 hover:bg-lightZincOpacity40',
      close:
        'group absolute left-2 top-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-darkZinc transition-all duration-300 hover:border-darkGreen hover:shadow-mainShadow dark:border-white dark:hover:border-darkGreen',
      close2:
        'flex h-9 w-10 cursor-pointer items-center justify-center rounded-full bg-transparent transition-all duration-300 hover:bg-mediumZinc hover:dark:bg-veryLightZincOpacity10',
      scrollDown:
        'group rounded-full bg-white p-2 outline-1 outline-mediumDarkGreen hover:scale-105 hover:outline',
      searchMessages:
        'ml-auto flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:bg-mediumZinc hover:dark:bg-veryLightZincOpacity10',
      sendMessages:
        'flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-transparent transition-all duration-300 hover:bg-veryLightZincOpacity20 hover:dark:bg-veryLightZincOpacity10',
      sendFileMessages:
        'rounded-full border border-veryDarkGray px-2 py-1 text-black transition-all duration-300 hover:bg-mediumZinc hover:shadow-mainShadow dark:text-white hover:dark:bg-extraDarkGray',
      resendSMS:
        'w-full rounded-md border border-black p-2 text-black disabled:border-mediumGray disabled:text-mediumGray dark:border-white dark:text-white disabled:dark:border-mediumGray disabled:dark:text-veryDarkGray',
      reactions:
        'cursor-pointer transition-all duration-100 ease-in-out hover:scale-125',
      signOut:
        'rounded-full border border-darkZinc px-2 py-1 transition-all duration-300 hover:bg-mediumZinc hover:shadow-mainShadow dark:border-darkZinc hover:dark:bg-extraDarkGray',
      profileSettings:
        'rounded-full border border-darkZinc px-2 py-1 text-black transition-all duration-300 hover:bg-mediumZinc hover:shadow-mainShadow dark:border-darkZinc dark:text-white hover:dark:border-white hover:dark:bg-extraDarkGray',
      updateProfilePhoto:
        'w-48 rounded-3xl border-2 border-black text-black transition-all duration-300 hover:bg-mediumZinc hover:shadow-mainShadow disabled:text-darkZinc dark:border-white dark:text-white hover:dark:bg-extraDarkGray',
      navBar:
        'relative flex h-10 w-12 cursor-pointer items-center justify-center rounded-full bg-transparent transition-all duration-300 hover:bg-mediumZinc hover:dark:bg-veryLightZincOpacity10',
      clearRegistrationForm:
        'mt-2 w-full rounded-md bg-mediumRed p-2 font-bold text-white disabled:text-veryDarkZinc',
    },
    position: {
      top: 'top-7',
      bottom: 'bottom-1',
    },
  },
});

interface IButtonProps extends VariantProps<typeof buttonStyles> {
  id?: string;
  type: 'button' | 'submit';
  disabled?: boolean;
  onClick?: (() => void) | ((e: React.MouseEvent) => void);
  ariaLabel: string;
  children: ReactNode;
}

const Button: FC<IButtonProps> = ({
  variant,
  position,
  id,
  type,
  disabled,
  onClick,
  ariaLabel,
  children,
}) => {
  return (
    <button
      className={buttonStyles({ variant, position })}
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
