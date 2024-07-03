import type { FC } from 'react';

import ReactionsUser from './ReactionsUser';

interface IReactionsDisplayProps {
  reactions?: {
    [emoji: string]: string[];
  };
}

const ReactionsDisplay: FC<IReactionsDisplayProps> = ({ reactions }) => {
  return (
    <div className="flex max-w-132px flex-wrap items-center gap-2">
      {reactions && (
        <>
          {Object.entries(reactions).map(([emoji, ids]) => (
            <div className="flex items-center justify-center gap-0" key={emoji}>
              {Array.isArray(ids) &&
                ids.map(id => <ReactionsUser key={id} userUID={id} />)}
              <span className="h-5 w-5">{emoji}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ReactionsDisplay;
