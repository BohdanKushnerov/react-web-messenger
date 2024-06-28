import type { FC } from 'react';

import ReactionsUser from './ReactionsUser';

import type { IReactionsDisplayProps } from '@interfaces/IReactionsDisplayProps';

const ReactionsDisplay: FC<IReactionsDisplayProps> = ({ reactions }) => {
  return (
    <div className="flex max-w-132px flex-wrap items-center gap-2">
      {reactions && (
        <>
          {Object.entries(reactions).map(([emoji, ids]) => (
            <div className="flex flex-row items-end gap-0" key={emoji}>
              {Array.isArray(ids) &&
                ids.map(id => <ReactionsUser key={id} userUID={id} />)}
              <span>{emoji}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ReactionsDisplay;
