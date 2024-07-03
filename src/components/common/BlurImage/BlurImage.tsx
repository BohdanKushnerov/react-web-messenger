import type { FC } from 'react';

interface IBlurImageProps {
  loading: boolean;
  children: React.ReactNode;
}

const BlurImage: FC<IBlurImageProps> = ({ loading, children }) => {
  return (
    <div
      className={`transition-filter h-min w-min duration-500 ${loading && 'bg-mediumZinc blur-lg filter'}`}
    >
      {children}
    </div>
  );
};

export default BlurImage;
