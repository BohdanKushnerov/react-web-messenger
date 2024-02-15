import { FC } from 'react';
import { ClipLoader } from 'react-spinners';

interface IButtonLoaderProps {
  size?: number;
}

const ButtonLoader: FC<IButtonLoaderProps> = ({ size = 15 }) => {
  return (
    <ClipLoader
      color={'rgb(63 63 70)'}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default ButtonLoader;
