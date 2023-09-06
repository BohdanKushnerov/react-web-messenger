import { db } from '../../firebase/config';
import {
  DocumentData,
  QuerySnapshot,
  collection,
  // endAt,
  getDocs,
  // orderBy,
  query,
  // startAt,
  where,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';

interface SearchProps {
  setChatList: (value: QuerySnapshot<DocumentData, DocumentData>) => void;
}

export default function Search({ setChatList }: SearchProps) {
  const [search, setSearch] = useState('');

useEffect(() => {
  const fetchData = async () => {
    if (search.trim() === '') {
      // If the search input is empty or only contains whitespace, don't perform the query.
      return;
    }

    // const lowercasedSearch = search.toLowerCase(); // Convert search query to lowercase

    const usersRef = collection(db, 'users');
    const q = query(
      usersRef,
      where('displayName', '>=', search),
      where('displayName', '<=', search + '\uf8ff')
      // usersRef,
      // orderBy('displayName'), // Order by the 'displayName' field
      // startAt(lowercasedSearch), // Start at the lowercase search query
      // endAt(lowercasedSearch + '\uf8ff') // End at the lowercase search query + '\uf8ff'
    );

    try {
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot.docs);
      setChatList(querySnapshot);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, [search, setChatList]);

  return (
    <div>
      <input
        className="py-1 px-10 h-10 w-60 rounded-3xl bg-cyan-300"
        type="text"
        placeholder="Search"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </div>
  );
}
