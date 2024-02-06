import { FC, RefObject } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface IMessagesSkeletonProps {
  scrollbarsRef: RefObject<Scrollbars>;
}

const MessagesSkeleton: FC<IMessagesSkeletonProps> = ({ scrollbarsRef }) => {
  const clientHeight = scrollbarsRef.current?.getClientHeight();

  return (
    <>
      {clientHeight && (
        <div
          className="absolute w-full z-10"
          style={{
            top: 56,
            height: 'calc(100% - 56px - 96px)',
            padding: 16,
          }}
        >
          <SkeletonTheme baseColor="#978e8e" highlightColor="#444">
            <p className="flex justify-start">
              <Skeleton
                count={1}
                inline
                width={100}
                height={clientHeight / 7}
                borderRadius={8}
              />
            </p>
            <p className="flex justify-end">
              <Skeleton
                count={1}
                inline
                width={200}
                height={clientHeight / 7}
                borderRadius={8}
              />
            </p>
            <p className="flex justify-start">
              <Skeleton
                count={1}
                inline
                width={200}
                height={clientHeight / 7}
                borderRadius={8}
              />
            </p>
            <p className="flex justify-start">
              <Skeleton
                count={1}
                inline
                width={230}
                height={clientHeight / 7}
                borderRadius={8}
              />
            </p>
            <p className="flex justify-end">
              <Skeleton
                count={1}
                inline
                width={180}
                height={clientHeight / 7}
                borderRadius={8}
              />
            </p>
            <p className="flex justify-end">
              <Skeleton
                count={1}
                inline
                width={300}
                height={clientHeight / 7}
                borderRadius={8}
              />
            </p>
          </SkeletonTheme>
        </div>
      )}
    </>
  );
};

export default MessagesSkeleton;
