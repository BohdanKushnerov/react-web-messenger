import { Dispatch, MutableRefObject, SetStateAction } from 'react';

const cleanUpRecordingResources = (
  mediaRecorderRef: MutableRefObject<MediaRecorder | null>,
  analyserRef: MutableRefObject<AnalyserNode | null>,
  setAudioChunks: Dispatch<SetStateAction<Blob[]>>
) => {
  if (mediaRecorderRef.current) {
    const tracks = mediaRecorderRef.current.stream.getTracks();
    tracks?.forEach(track => track.stop());
    setAudioChunks([]);
  }

  if (analyserRef.current) {
    analyserRef.current.disconnect();
  }
};

export default cleanUpRecordingResources;
