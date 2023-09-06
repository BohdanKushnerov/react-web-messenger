import Chat from '@components/Chat/Chat'
import Sidebar from '@components/Sidebar/Sidebar'

export default function Home() {
  return (
    <div className='flex'>
      <Sidebar/>
      <Chat/>
    </div>
  )
}
