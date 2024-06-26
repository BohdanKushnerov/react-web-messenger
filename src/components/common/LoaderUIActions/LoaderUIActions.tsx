import type { FC } from 'react';
import { ClipLoader } from 'react-spinners';

interface ILoaderUIActionsProps {
  size?: number;
}
const LoaderUIActions: FC<ILoaderUIActionsProps> = ({ size = 15 }) => {
  return (
    <ClipLoader
      color="#ffb641"
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default LoaderUIActions;
