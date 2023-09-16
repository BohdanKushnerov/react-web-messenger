import Chat from '@components/Chat/Chat'
import Sidebar from '@components/Sidebar/Sidebar'

function Home() {
  return (
    <div className='flex h-screen'>
      <Sidebar/>
      <Chat />
    </div>
  )
}

export default Home;
