import { FC, useRef, useState } from 'react';

import RecordingStatusField from '../RecordingStatusField/RecordingStatusField';
import useChatStore from '@zustand/store';
import handleSendAudio from '@utils/chatForm/handleSendAudio';
import useStartRecording from '@hooks/useStartRecording';
import useRecordingCleanup from '@hooks/useRecordingCleanup';
import cleanUpRecordingResources from '@utils/chatForm/cleanupRecordingResources';
import { IRecordingAudioProps } from '@interfaces/IRecordingAudioProps';
import sprite from '@assets/sprite.svg';

const RecordingAudio: FC<IRecordingAudioProps> = ({
  isRecording,
  handleToggleRecordingStatus,
}) => {
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [recordingDuration, setRecordingDuration] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationIdRef = useRef<number | null>(null);

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID, userUID } = useChatStore(state => state.currentChatInfo);

  const mimeType = 'audio/webm';

  useStartRecording(
    isRecording,
    mimeType,
    mediaRecorderRef,
    canvasRef,
    analyserRef,
    animationIdRef,
    setRecordingDuration,
    setAudioChunks
  );

  useRecordingCleanup(
    animationIdRef,
    mediaRecorderRef,
    analyserRef,
    setAudioChunks,
    handleToggleRecordingStatus
  );

  const cancelRecording = () => {
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
      <RecordingStatusField
        isRecording={isRecording}
        recordingDuration={recordingDuration}
        canvasRef={canvasRef}
      />

      {isRecording && (
        <>
          <button
            className="flex justify-center items-center h-12 w-12 bg-transparent transition-all duration-300 hover:bg-zinc-100/20 hover:dark:bg-zinc-100/10 rounded-full cursor-pointer"
            type="button"
            onClick={cancelRecording}
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
