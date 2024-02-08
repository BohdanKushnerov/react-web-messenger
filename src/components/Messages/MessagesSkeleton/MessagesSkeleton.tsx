import { FC, memo } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { IMessagesSkeletonProps } from '@interfaces/IMessagesSkeletonProps';

const MessagesSkeleton: FC<IMessagesSkeletonProps> = memo(
  ({ scrollbarsRef }) => {
    if (!scrollbarsRef.current) {
      return null;
    }

    const clientHeight = scrollbarsRef.current.getClientHeight();

    const quantitySceletons = Math.floor(clientHeight / 90);

    const randomJustify = () =>
      Math.random() < 0.5 ? 'justify-start' : 'justify-end';

    return (
      <>
        {clientHeight && (
          <div
            className="absolute w-full xl:w-8/12 z-10 left-1/2 transform -translate-x-1/2"
            style={{
              top: 56,
              height: 'calc(100% - 56px - 96px)',
              padding: 16,
            }}
          >
            <SkeletonTheme baseColor="#e9e5e580" highlightColor="#444">
              {Array.from({ length: quantitySceletons }, (_, index) => (
                <div className={`flex ${randomJustify()}`} key={index}>
                  <Skeleton
                    count={1}
                    inline
                    width={120}
                    height={80}
                    borderRadius={8}
                  />
                </div>
              ))}
            </SkeletonTheme>
          </div>
        )}
      </>
    );
  }
);

export default MessagesSkeleton;
