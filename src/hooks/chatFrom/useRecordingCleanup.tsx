import {
  type Dispatch,
  type MutableRefObject,
  type SetStateAction,
  useEffect,
} from 'react';

import cleanUpRecordingResources from '@utils/chatForm/cleanupRecordingResources';

type UseRecordingCleanup = (
  animationIdRef: MutableRefObject<number | null>,
  mediaRecorderRef: MutableRefObject<MediaRecorder | null>,
  analyserRef: MutableRefObject<AnalyserNode | null>,
  setAudioChunks: Dispatch<SetStateAction<Blob[]>>,
  handleToggleRecordingStatus: () => void
) => void;

const useRecordingCleanup: UseRecordingCleanup = (
  animationIdRef,
  mediaRecorderRef,
  analyserRef,
  setAudioChunks,
  handleToggleRecordingStatus
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
    handleToggleRecordingStatus,
    analyserRef,
    setAudioChunks,
    animationIdRef,
    mediaRecorderRef,
  ]);
};

export default useRecordingCleanup;
