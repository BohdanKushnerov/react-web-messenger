import type { FC, MutableRefObject } from 'react';
import { Transition, type TransitionStatus } from 'react-transition-group';

import classNames from 'classnames';

type ExitedBehaviorValue = 'opacity' | 'hidden';
type EnteredBehaviorValue =
  | 'translate-left'
  | 'translate-right'
  | 'opacity'
  | 'rotate';

interface ITransitionComponentProps {
  className: string;
  nodeRef: MutableRefObject<null>;
  condition: boolean;
  timeout: number;
  exitedBehavior: ExitedBehaviorValue;
  enteredBehavior: EnteredBehaviorValue;
  children: React.ReactNode;
}

const getExitedBehaviorStyles = (
  state: TransitionStatus,
  behavior: ExitedBehaviorValue
) => {
  switch (behavior) {
    case 'opacity':
      return state === 'exited' && 'scale-0 opacity-0';

    case 'hidden':
      return state === 'exited' && 'hidden';

    default:
      return '';
  }
};

const getEnteredBehaviorStyles = (
  state: TransitionStatus,
  behavior: EnteredBehaviorValue
): string => {
  switch (behavior) {
    case 'translate-left':
      return state === 'entered'
        ? 'translate-x-0 scale-100'
        : '-translate-x-full scale-0';

    case 'translate-right':
      return state === 'entered'
        ? 'translate-x-0 scale-100'
        : 'translate-x-full scale-0';

    case 'opacity':
      return state === 'entered'
        ? 'scale-100 opacity-100'
        : 'translate-x-4 translate-y-10 scale-0 opacity-50';

    case 'rotate':
      return state === 'entered'
        ? 'translate-x-0 rotate-0'
        : '-translate-x-1/2 rotate-180';

    default:
      return '';
  }
};

const TransitionComponent: FC<ITransitionComponentProps> = ({
  className,
  nodeRef,
  condition,
  timeout,
  exitedBehavior,
  enteredBehavior,
  children,
}) => {
  return (
    <Transition
      nodeRef={nodeRef}
      in={condition}
      timeout={timeout}
      unmountOnExit
    >
      {state => (
        <div
          ref={nodeRef}
          className={classNames(
            className,
            getExitedBehaviorStyles(state, exitedBehavior),
            'transform transition-transform',
            `duration-${timeout}`,
            getEnteredBehaviorStyles(state, enteredBehavior)
          )}
        >
          {children}
        </div>
      )}
    </Transition>
  );
};

export default TransitionComponent;
