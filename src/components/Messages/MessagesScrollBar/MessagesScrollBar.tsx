import { forwardRef, memo } from 'react';

import { IMessagesScrollBarProps } from '@interfaces/IMessagesScrollBarProps';

import { ElementsId } from '@enums/elementsId';

const MessagesScrollBar = memo(
  forwardRef<HTMLDivElement, IMessagesScrollBarProps>(
    ({ handleScroll, children }, ref) => {
      console.log('MessagesScrollBar');
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
            id={ElementsId.Scrollbars}
            ref={ref}
            style={{
              width: '100%',
              height: '100%',
              overflowY: 'scroll',
            }}
            onScroll={handleScroll}
          >
            {children}
          </div>
        </div>
      );
    }
  )
);

export default MessagesScrollBar;
