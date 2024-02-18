import { FC } from 'react';
import { ClipLoader } from 'react-spinners';

interface ILoaderUIActionsProps {
  size?: number;
}

const LoaderUIActions: FC<ILoaderUIActionsProps> = ({ size = 15 }) => {
  return (
    <ClipLoader
      // color={'rgb(63 63 70)'}
      color='white'
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default LoaderUIActions;
