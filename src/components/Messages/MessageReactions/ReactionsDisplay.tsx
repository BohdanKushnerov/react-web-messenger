import { FC } from 'react';

import ReactionsUser from './ReactionsUser';

import { IReactionsDisplayProps } from '@interfaces/IReactionsDisplayProps';

const ReactionsDisplay: FC<IReactionsDisplayProps> = ({ reactions }) => {
  return (
    <div className="flex flex-row gap-1">
      {reactions && (
        <>
          {Object.entries(reactions).map(([emoji, ids]) => (
            <div className="flex gap-0" key={emoji}>
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
