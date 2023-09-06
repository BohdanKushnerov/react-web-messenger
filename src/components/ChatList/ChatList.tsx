import { DocumentData, QuerySnapshot } from 'firebase/firestore';

interface ChatListProps {
  chatList: QuerySnapshot<DocumentData, DocumentData> | null;
}

export default function ChatList({ chatList }: ChatListProps) {

  // console.log(chatList?.docs)

  chatList?.forEach(doc => {
    console.log('doc.data()', doc.data());
  });

  return (
    <div>
      <ul>
        {chatList?.docs.map(doc => (
          <li key={doc.id}>{doc.data().displayName}</li>
        ))}
        {/* {chatList?.forEach(doc => {
        
        console.log("doc.data()", doc.data());
        })} */}
      </ul>
    </div>
  );
}


