import { db } from '../../firebase/config';
import {
  DocumentData,
  QuerySnapshot,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import capitalizeName from './utils/capitalizeFirstLetterName';

interface SearchProps {
  setChatList: (value: QuerySnapshot<DocumentData, DocumentData> | []) => void;
}

export default function Search({ setChatList }: SearchProps) {
  const [search, setSearch] = useState('');

useEffect(() => {
  const fetchData = async () => {
    if (search.trim() === '') {
      setChatList([])
      return;
    }

    const queryName = capitalizeName(search);

    const usersRef = collection(db, 'users');
    const q = query(
      usersRef,
      where('displayName', '>=', queryName),
      where('displayName', '<=', queryName + '\uf8ff')
    );

    try {
      const querySnapshot = await getDocs(q);

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
