import type { FC } from 'react';

import classNames from 'classnames';

interface IBlurImageProps {
  loading: boolean;
  children: React.ReactNode;
}

const BlurImage: FC<IBlurImageProps> = ({ loading, children }) => {
  return (
    <div
      className={classNames('transition-filter h-min w-min duration-500', {
        'bg-mediumZinc blur-lg filter': loading,
      })}
    >
      {children}
    </div>
  );
};

export default BlurImage;
