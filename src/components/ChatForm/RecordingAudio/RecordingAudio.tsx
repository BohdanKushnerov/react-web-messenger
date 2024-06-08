import { FC, useRef, useState } from 'react';

import RecordingStatusField from '../RecordingStatusField/RecordingStatusField';
import ButtonCancelRecording from '@components/Buttons/ButtonCancelRecording/ButtonCancelRecording';
import ButtonStopRecordingAndSendAudio from '@components/Buttons/ButtonStopRecordingAndSendAudio/ButtonStopRecordingAndSendAudio';
import useChatStore from '@zustand/store';
import useStartRecording from '@hooks/useStartRecording';
import useRecordingCleanup from '@hooks/useRecordingCleanup';
import handleSendAudio from '@utils/chatForm/handleSendAudio';
import cleanUpRecordingResources from '@utils/chatForm/cleanupRecordingResources';
import { IRecordingAudioProps } from '@interfaces/IRecordingAudioProps';

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
    audioChunks,
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

      <ButtonCancelRecording cancelRecording={cancelRecording} />
      <ButtonStopRecordingAndSendAudio
        stopRecordingAndSendAudio={stopRecordingAndSendAudio}
      />
    </>
  );
};

export default RecordingAudio;
