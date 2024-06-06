import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';

import cleanUpRecordingResources from '@utils/chatForm/cleanupRecordingResources';

const useRecordingCleanup = (
  audioChunks: Blob[],
  animationIdRef: MutableRefObject<number | null>,
  mediaRecorderRef: MutableRefObject<MediaRecorder | null>,
  analyserRef: MutableRefObject<AnalyserNode | null>,
  setAudioChunks: Dispatch<SetStateAction<Blob[]>>,
  handleToggleRecordingStatus: () => void
) => {
  useEffect(() => {
    const animationId = animationIdRef.current;
    const mediaRecorder = mediaRecorderRef.current;

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationIdRef.current = null;
      }

      if (mediaRecorder) {
        mediaRecorder.stop();
        mediaRecorder.onstop = () => {
          cleanUpRecordingResources(
            mediaRecorderRef,
            analyserRef,
            setAudioChunks
          );
          handleToggleRecordingStatus();
        };
      }
    };
  }, [
    audioChunks,
    handleToggleRecordingStatus,
    analyserRef,
    setAudioChunks,
    animationIdRef,
    mediaRecorderRef,
  ]);
};

export default useRecordingCleanup;
