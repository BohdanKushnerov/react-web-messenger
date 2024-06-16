import {
  Dispatch,
  MutableRefObject,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';

import setupAudioAnalyzer from '@utils/chatForm/setupAudioAnalyzer';
import startRecordingTimer from '@utils/chatForm/startRecordingTimer';

import { MimeType } from 'types/MimeType';
import { UseStartRecording } from 'types/hooks/UseStartRecording';

const useStartRecording: UseStartRecording = (
  isRecording: boolean,
  mediaRecorderRef: MutableRefObject<MediaRecorder | null>,
  canvasRef: RefObject<HTMLCanvasElement>,
  analyserRef: MutableRefObject<AnalyserNode | null>,
  animationIdRef: MutableRefObject<number | null>,
  setRecordingDuration: Dispatch<SetStateAction<number>>,
  setAudioChunks: Dispatch<SetStateAction<Blob[]>>
) => {
  const intervalIdrecordingRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );

  const mimeType: MimeType = 'audio/webm';

  useEffect(() => {
    if (isRecording) {
      const startRecording = async () => {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });

        if (streamData) {
          startRecordingTimer(intervalIdrecordingRef, setRecordingDuration);

          const media = new MediaRecorder(streamData, { mimeType: mimeType });
          mediaRecorderRef.current = media;
          mediaRecorderRef.current.start();

          const localAudioChunks: Blob[] = [];
          mediaRecorderRef.current.ondataavailable = event => {
            if (typeof event.data === 'undefined') return;
            if (event.data.size === 0) return;
            localAudioChunks.push(event.data);
          };
          setAudioChunks(localAudioChunks);

          setupAudioAnalyzer(
            streamData,
            canvasRef,
            analyserRef,
            animationIdRef
          );
        }
      };

      startRecording();
    }

    return () => {
      if (intervalIdrecordingRef.current) {
        clearInterval(intervalIdrecordingRef.current);
        intervalIdrecordingRef.current = null;
      }
    };
  }, [
    analyserRef,
    animationIdRef,
    canvasRef,
    isRecording,
    mediaRecorderRef,
    setAudioChunks,
    setRecordingDuration,
  ]);
};

export default useStartRecording;
