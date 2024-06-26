import { Timestamp } from 'firebase/firestore';

const extractDateString = (timestamp: Timestamp): string => {
  const date = timestamp.toDate();
  return date.toISOString().split('T')[0];
};

export default extractDateString;
