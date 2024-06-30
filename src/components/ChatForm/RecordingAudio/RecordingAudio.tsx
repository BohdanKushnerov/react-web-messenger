import type { FC } from 'react';
import { useRef, useState } from 'react';

import RecordingStatusField from '../RecordingStatusField/RecordingStatusField';

import Button from '@components/common/Button/Button';
import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import useChatStore from '@store/store';

import useRecordingCleanup from '@hooks/useRecordingCleanup';
import useStartRecording from '@hooks/useStartRecording';

import cleanUpRecordingResources from '@utils/chatForm/cleanupRecordingResources';
import handleSendAudio from '@utils/chatForm/handleSendAudio';

import type { IRecordingAudioProps } from '@interfaces/IRecordingAudioProps';

import { IconId } from '@enums/iconsSpriteId';

import type { MimeType } from 'types/MimeType';

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

  const mimeType: MimeType = 'audio/webm';

  useStartRecording(
    isRecording,
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
            console.error('stopRecordingAndSendAudio', error);
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
        ref={canvasRef}
      />

      <Button
        variant="recording"
        type="button"
        onClick={cancelRecording}
        ariaLabel="Cancel recording"
      >
        <SvgIcon
          className="fill-mediumLightZinc dark:fill-mediumZinc"
          iconId={IconId.IconDeleteButton}
          size={24}
        />
      </Button>
      <Button
        variant="recording"
        type="button"
        onClick={stopRecordingAndSendAudio}
        ariaLabel="Stop recording and send audio"
      >
        <SvgIcon
          className="fill-mediumLightZinc dark:fill-mediumZinc"
          iconId={IconId.IconStop}
          size={24}
        />
      </Button>
    </>
  );
};

export default RecordingAudio;
