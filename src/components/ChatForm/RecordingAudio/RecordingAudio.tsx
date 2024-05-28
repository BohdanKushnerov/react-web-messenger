import { FC, useEffect, useRef, useState } from 'react';

import useChatStore from '@zustand/store';
import handleSendAudio from '@utils/chatForm/handleSendAudio';
import setupAudioAnalyzer from '@utils/chatForm/setupAudioAnalyzer';
import startRecordingTimer from '@utils/chatForm/startRecordingTimer';
import cleanUpRecordingResources from '@utils/chatForm/cleanupRecordingResources';
import { IRecordingAudioProps } from '@interfaces/IRecordingAudioProps';
import sprite from '@assets/sprite.svg';

const RecordingAudio: FC<IRecordingAudioProps> = ({
  isRecording,
  handleToggleRecordingStatus,
}) => {
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const intervalIdrecordingRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationIdRef = useRef<number | null>(null);

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID, userUID } = useChatStore(state => state.currentChatInfo);

  const mimeType = 'audio/webm';

  // начинает запись
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
  }, [isRecording]);

  // при смене чата если идет запись остановит запись
  useEffect(() => {
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }

      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.onstop = () => {
          cleanUpRecordingResources(
            mediaRecorderRef,
            analyserRef,
            setAudioChunks
          );
          handleToggleRecordingStatus();
        };
      }
    };
  }, [handleToggleRecordingStatus]);

  const stopRecording = () => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }

    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.onstop = () => {
        cleanUpRecordingResources(
          mediaRecorderRef,
          analyserRef,
          setAudioChunks
        );
        handleToggleRecordingStatus();
      };
    }
  };

  const stopRecordingAndSendAudio = () => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }

    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: mimeType });

        if (chatUID && userUID && currentUserUID) {
          try {
            cleanUpRecordingResources(
              mediaRecorderRef,
              analyserRef,
              setAudioChunks
            );
            handleToggleRecordingStatus();
            await handleSendAudio(audioBlob, chatUID, userUID, currentUserUID);
          } catch (error) {
            console.log('stopRecordingAndSendAudio error', error);
          }
        }
      };
    }
  };

  return (
    <>
      {
        <div
          className={`absolute top-1/2 right-28 -translate-y-1/2 z-20 flex items-center py-1 px-3 gap-2 bg-red-200 rounded-full ${
            isRecording ? 'block' : 'hidden'
          }`}
        >
          <svg width={24} height={24} className="fill-red-700 animate-pulse">
            <use href={sprite + '#icon-rec'} />
          </svg>
          <canvas
            className="w-40 h-5 sm:w-8 md:w-40 lg:w-52"
            ref={canvasRef}
            width={192}
            height={20}
          ></canvas>
          {isRecording && recordingDuration && (
            <span className="w-8">{recordingDuration.toFixed(1)}</span>
          )}
        </div>
      }
      {isRecording && (
        <>
          <button
            className="flex justify-center items-center h-12 w-12 bg-transparent transition-all duration-300 hover:bg-zinc-100/20 hover:dark:bg-zinc-100/10 rounded-full cursor-pointer"
            type="button"
            onClick={stopRecording}
          >
            <svg
              width={24}
              height={24}
              className="fill-zinc-200 dark:fill-zinc-400"
            >
              <use href={sprite + '#icon-delete-button'} />
            </svg>
          </button>
          <button
            className="flex justify-center items-center h-12 w-12 bg-transparent transition-all duration-300 hover:bg-zinc-100/20 hover:dark:bg-zinc-100/10 rounded-full cursor-pointer"
            type="button"
            onClick={stopRecordingAndSendAudio}
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
