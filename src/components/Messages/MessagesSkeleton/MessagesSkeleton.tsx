import { FC, memo } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import useResizeWindow from '@hooks/useResizeWindow';

import { IMessagesSkeletonProps } from '@interfaces/IMessagesSkeletonProps';

import { ElementsId } from '@enums/elementsId';

const MessagesSkeleton: FC<IMessagesSkeletonProps> = memo(
  ({ isLoadedContent }) => {
    const { heightWindow } = useResizeWindow();

    const clientHeight = heightWindow - 56 - 96;

    const quantitySceletons = Math.floor(clientHeight / 90);

    const randomJustify = () =>
      Math.random() < 0.5 ? 'justify-start' : 'justify-end';

    return (
      <>
        {!isLoadedContent && (
          <div
            id={ElementsId.Skeleton}
            className="absolute left-1/2 z-10 w-full -translate-x-1/2 transform xl:w-8/12"
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

MessagesSkeleton.displayName = 'MessagesSkeleton';

export default MessagesSkeleton;
