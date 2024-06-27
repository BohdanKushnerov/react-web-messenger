import { useEffect } from 'react';

import cleanUpRecordingResources from '@utils/chatForm/cleanupRecordingResources';

import type { UseRecordingCleanup } from 'types/hooks/UseRecordingCleanup';

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
