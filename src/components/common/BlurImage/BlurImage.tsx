import type { FC } from 'react';

import type { IBlurImageProps } from '@interfaces/IBlurImageProps';

const BlurImage: FC<IBlurImageProps> = ({ loading, children }) => {
  return (
    <div
      className={`transition-filter duration-500 ${loading && 'bg-mediumZinc blur-lg filter'}`}
    >
      {children}
    </div>
  );
};

export default BlurImage;
