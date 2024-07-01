import type { FC, ReactNode } from 'react';

interface IBlurImageProps {
  loading: boolean;
  children: ReactNode;
}

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
