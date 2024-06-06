import { Dispatch, MutableRefObject, SetStateAction } from 'react';

const cleanUpRecordingResources = (
  mediaRecorderRef: MutableRefObject<MediaRecorder | null>,
  analyserRef: MutableRefObject<AnalyserNode | null>,
  setAudioChunks: Dispatch<SetStateAction<Blob[]>>
) => {
  const tracks = mediaRecorderRef?.current?.stream.getTracks();
  tracks?.forEach(track => track.stop());
  setAudioChunks([]);
  mediaRecorderRef.current = null;

  if (analyserRef.current) {
    analyserRef.current.disconnect();
    analyserRef.current = null;
  }
};

export default cleanUpRecordingResources;
