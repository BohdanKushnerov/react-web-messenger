import { useNavigate } from 'react-router-dom';

import MessageList from '@components/MessageList/MessageList';
import ChatForm from '../ChatForm/ChatForm';
import ChatHeader from '../ChatHeader/ChatHeader';
import useChatStore from '@zustand/store';
import { IChat } from '@interfaces/IChat';

function Chat({ setScreen }: IChat) {
  const navigate = useNavigate();

  const { chatUID } = useChatStore(state => state.currentChatInfo);
  const resetCurrentChatInfo = useChatStore(
    state => state.resetCurrentChatInfo
  );

  console.log('screen --> Chat');

  const handleClickBackToSidebarScreen = () => {
    if (setScreen) {
      setScreen('Sidebar');
      resetCurrentChatInfo();
      navigate('/');
    }
  };

  return (
    <>
      <div className="relative h-full w-screen xl:flex xl:flex-col xl:items-center bg-transparent overflow-hidden ">
        {chatUID ? (
          <>
            <ChatHeader
              setScreen={setScreen}
              handleClickBackToSidebarScreen={handleClickBackToSidebarScreen}
            />

            <MessageList />

            <ChatForm />
          </>
        ) : (
          <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-gray-700 rounded-xl text-center text-white font-black">
            Select or search user who you would to start messaging
          </h2>
        )}
      </div>
    </>
  );
}

export default Chat;
