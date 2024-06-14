import { forwardRef } from 'react';

import { IRecordingStatusFieldProps } from '@interfaces/IRecordingStatusFieldProps';
import sprite from '@assets/sprite.svg';

const RecordingStatusField = forwardRef<
  HTMLCanvasElement,
  IRecordingStatusFieldProps
>(({ isRecording, recordingDuration }, ref) => {
  return (
    <div
      className={`absolute top-1/2 right-28 -translate-y-1/2 z-20 flex items-center py-1 px-3 gap-2 bg-lightRed rounded-full ${
        isRecording ? 'block' : 'hidden'
      }`}
    >
      <svg width={24} height={24} className="fill-veryDarkRed animate-pulse">
        <use href={sprite + '#icon-rec'} />
      </svg>
      <canvas
        className="w-40 h-5 sm:w-8 md:w-40 lg:w-52"
        ref={ref}
        width={192}
        height={20}
      ></canvas>
      {isRecording && recordingDuration && (
        <span className="w-8">{recordingDuration.toFixed(1)}</span>
      )}
    </div>
  );
});

export default RecordingStatusField;
