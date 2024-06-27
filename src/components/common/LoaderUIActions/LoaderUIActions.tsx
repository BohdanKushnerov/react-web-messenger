import type { FC } from 'react';
import { ClipLoader } from 'react-spinners';

import type { ILoaderUIActionsProps } from '@interfaces/ILoaderUIActionsProps';

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
