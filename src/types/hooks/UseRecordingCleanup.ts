import type { Dispatch, MutableRefObject, SetStateAction } from 'react';

export type UseRecordingCleanup = (
  animationIdRef: MutableRefObject<number | null>,
  mediaRecorderRef: MutableRefObject<MediaRecorder | null>,
  analyserRef: MutableRefObject<AnalyserNode | null>,
  setAudioChunks: Dispatch<SetStateAction<Blob[]>>,
  handleToggleRecordingStatus: () => void
) => void;
