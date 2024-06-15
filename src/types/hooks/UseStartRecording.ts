import { Dispatch, MutableRefObject, RefObject, SetStateAction } from 'react';

export type UseStartRecording = (
  isRecording: boolean,
  mediaRecorderRef: MutableRefObject<MediaRecorder | null>,
  canvasRef: RefObject<HTMLCanvasElement>,
  analyserRef: MutableRefObject<AnalyserNode | null>,
  animationIdRef: MutableRefObject<number | null>,
  setRecordingDuration: Dispatch<SetStateAction<number>>,
  setAudioChunks: Dispatch<SetStateAction<Blob[]>>
) => void;
