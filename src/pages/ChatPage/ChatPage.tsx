import { FC } from 'react';

import Chat from '@components/Chat/Chat';

const ChatPage: FC = () => {
  return <Chat />;
};

export default ChatPage;

// <Transition
//   nodeRef={nodeRefChat}
//   in={showChat}
//   timeout={300}
//   unmountOnExit
//   mountOnEnter
// >
//   {state => (
//     <div
//       ref={nodeRefChat}
//       className={`transform transition-transform
//               ${state === 'exited' ? 'hidden' : ''}
//               ${
//                 state === 'entered'
//                   ? 'translate-x-0 scale-100'
//                   : 'translate-x-full scale-0'
//               }`}
//     >
//       <Chat />
//     </div>
//   )}
// </Transition>
