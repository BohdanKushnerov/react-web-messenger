import { useEffect } from 'react';

import cleanUpRecordingResources from '@utils/chatForm/cleanupRecordingResources';

import { UseRecordingCleanup } from 'types/hooks/UseRecordingCleanup';

const useRecordingCleanup: UseRecordingCleanup = (
  audioChunks,
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
    audioChunks,
    handleToggleRecordingStatus,
    analyserRef,
    setAudioChunks,
    animationIdRef,
    mediaRecorderRef,
  ]);
};

export default useRecordingCleanup;
