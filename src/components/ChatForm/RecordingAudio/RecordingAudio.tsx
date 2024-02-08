import { FC, useEffect, useRef, useState } from 'react';

import useChatStore from '@zustand/store';
import handleSendAudio from '@utils/handleSendAudio';
import setupAudioAnalyzer from '@utils/setupAudioAnalyzer';
import sprite from '@assets/sprite.svg';

interface IRecordingAudioProps {
  isRecording: boolean;
  handleChangeRecordingStatus: () => void;
}

const RecordingAudio: FC<IRecordingAudioProps> = ({
  isRecording,
  handleChangeRecordingStatus,
}) => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationIdRef = useRef<number | null>(null);

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID, userUID } = useChatStore(state => state.currentChatInfo);

  const mimeType = 'audio/webm';

  const stopRecordingAndDisconnectAnalyser = () => {
    if (mediaRecorderRef.current) {
      const tracks = mediaRecorderRef.current.stream.getTracks();
      tracks?.forEach(track => track.stop());
      setAudioChunks([]);
    }

    if (analyserRef.current) {
      analyserRef.current.disconnect();
    }
  };

  useEffect(() => {
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }

      stopRecordingAndDisconnectAnalyser();
    };
  }, []);

  useEffect(() => {
    if (isRecording) {
      const startRecording = async () => {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });

        if (streamData) {
          // setRecordingStatus('recording');
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
  }, [isRecording]);

  useEffect(() => {
    if (!isRecording) {
      const stopRecording = () => {
        // setRecordingStatus('inactive');
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }

        if (mediaRecorderRef.current) {
          mediaRecorderRef.current.stop();
          mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: mimeType });

            if (chatUID && userUID && currentUserUID) {
              handleSendAudio(audioBlob, chatUID, userUID, currentUserUID);
            }

            stopRecordingAndDisconnectAnalyser();
          };
        }
      };

      stopRecording();
    }
  }, [audioChunks, chatUID, currentUserUID, isRecording, userUID]);

  // const startRecording = async () => {
  //   const streamData = await navigator.mediaDevices.getUserMedia({
  //     audio: true,
  //     video: false,
  //   });

  //   if (streamData) {
  //     setRecordingStatus('recording');
  //     const media = new MediaRecorder(streamData, { mimeType: mimeType });
  //     mediaRecorderRef.current = media;
  //     mediaRecorderRef.current.start();

  //     const localAudioChunks: Blob[] = [];
  //     mediaRecorderRef.current.ondataavailable = event => {
  //       if (typeof event.data === 'undefined') return;
  //       if (event.data.size === 0) return;
  //       localAudioChunks.push(event.data);
  //     };
  //     setAudioChunks(localAudioChunks);

  //     setupAudioAnalyzer(streamData, canvasRef, analyserRef, animationIdRef);
  //   }
  // };

  // const stopRecording = () => {
  //   setRecordingStatus('inactive');
  //   if (animationIdRef.current) {
  //     cancelAnimationFrame(animationIdRef.current);
  //     animationIdRef.current = null;
  //   }

  //   if (mediaRecorderRef.current) {
  //     mediaRecorderRef.current.stop();
  //     mediaRecorderRef.current.onstop = () => {
  //       const audioBlob = new Blob(audioChunks, { type: mimeType });

  //       if (chatUID && userUID && currentUserUID) {
  //         handleSendAudio(audioBlob, chatUID, userUID, currentUserUID);
  //       }

  //       stopRecordingAndDisconnectAnalyser();
  //     };
  //   }
  // };

  return (
    <>
      {
        <div
          className={`absolute top-1/2 right-28 -translate-y-1/2 z-20 flex p-1 gap-2 bg-red-200 rounded-full ${
            isRecording ? 'block' : 'hidden'
          }`}
        >
          <svg width={24} height={24} className="fill-red-700 ">
            <use href={sprite + '#icon-rec'} />
          </svg>
          <canvas ref={canvasRef} width={200} height={20}></canvas>
        </div>
      }
      {/* {recordingStatus === 'inactive' && (
        <button
          className="flex justify-center items-center h-12 w-12 bg-transparent transition-all duration-300 hover:bg-zinc-100/20 hover:dark:bg-zinc-100/10 rounded-full cursor-pointer"
          type="button"
          onClick={startRecording}
        >
          <svg
            width={24}
            height={24}
            className="fill-zinc-200 dark:fill-zinc-400"
          >
            <use href={sprite + '#icon-mic'} />
          </svg>
        </button>
      )} */}
      {isRecording && (
        <>
          <button
            className="flex justify-center items-center h-12 w-12 bg-transparent transition-all duration-300 hover:bg-zinc-100/20 hover:dark:bg-zinc-100/10 rounded-full cursor-pointer"
            type="button"
            onClick={handleChangeRecordingStatus}
          >
            <svg
              width={24}
              height={24}
              className="fill-zinc-200 dark:fill-zinc-400"
            >
              <use href={sprite + '#icon-stop'} />
            </svg>
          </button>
        </>
      )}
    </>
  );
};

export default RecordingAudio;
