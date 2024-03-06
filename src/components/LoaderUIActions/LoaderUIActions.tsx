import { FC } from 'react';
import { ClipLoader } from 'react-spinners';

interface ILoaderUIActionsProps {
  size?: number;
}

const LoaderUIActions: FC<ILoaderUIActionsProps> = ({ size = 15 }) => {
  // const theme = localStorage.getItem('theme');

  return (
    <ClipLoader
      // color={theme === 'dark' ? "white" : 'black'}
      // color={theme === 'dark' ? '#ffb641' : '#c6da96'}
      color="#ffb641"
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default LoaderUIActions;
