import { FC } from 'react';

import { IMessagesScrollBarProps } from '@interfaces/IMessagesScrollBarProps';

const MessagesScrollBar: FC<IMessagesScrollBarProps> = ({
  scrollbarsRef,
  handleScroll,
  children,
}) => {
  return (
    <div
      style={{
        marginTop: 56,
        width: '100%',
        height: 'calc(100% - 152px)',
        overflow: 'hidden',
      }}
    >
      <div
        id="scrollbars"
        ref={scrollbarsRef}
        style={{
          width: '100%',
          height: '100%',
          // overflow: 'scroll',
          overflowY: 'scroll',
        }}
        onScroll={handleScroll}
      >
        {children}
      </div>
    </div>
  );
};

export default MessagesScrollBar;
