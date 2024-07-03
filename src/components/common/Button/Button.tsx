import { type FC } from 'react';

import type { VariantProps } from 'class-variance-authority';

import { buttonStyles } from './buttonStyles';

interface IButtonProps extends VariantProps<typeof buttonStyles> {
  id?: string;
  type: 'button' | 'submit';
  disabled?: boolean;
  onClick?: (() => void) | ((e: React.MouseEvent) => void);
  ariaLabel: string;
  children: React.ReactNode;
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
