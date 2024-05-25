import { Dispatch, MutableRefObject, SetStateAction } from 'react';

const startRecordingTimer = (
  intervalIdrecordingRef: MutableRefObject<NodeJS.Timeout | null>,
  setRecordingDuration: Dispatch<SetStateAction<number>>
) => {
  const startTime = Date.now();

  intervalIdrecordingRef.current = setInterval(() => {
    setRecordingDuration((Date.now() - startTime) / 1000);
  }, 100);
};

export default startRecordingTimer;
