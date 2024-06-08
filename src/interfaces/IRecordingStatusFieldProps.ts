import { RefObject } from 'react';

export interface IRecordingStatusFieldProps {
  isRecording: boolean;
  recordingDuration: number;
  canvasRef: RefObject<HTMLCanvasElement>;
}
