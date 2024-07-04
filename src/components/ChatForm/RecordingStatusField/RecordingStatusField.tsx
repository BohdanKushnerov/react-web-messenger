import { forwardRef } from 'react';

import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import { IconId } from '@enums/iconsSpriteId';

interface IRecordingStatusFieldProps {
  isRecording: boolean;
  recordingDuration: number;
}

const RecordingStatusField = forwardRef<
  HTMLCanvasElement,
  IRecordingStatusFieldProps
>(({ isRecording, recordingDuration }, ref) => {
  return (
    <div className="absolute right-28 top-1/2 z-20 flex -translate-y-1/2 items-center gap-2 rounded-full bg-lightRed px-3 py-1">
      <SvgIcon
        className="animate-pulse fill-veryDarkRed"
        iconId={IconId.IconRec}
        size={24}
      />
      <canvas
        className="h-5 w-40 sm:w-8 md:w-40 lg:w-52"
        ref={ref}
        width={192}
        height={20}
      />
      {isRecording && recordingDuration && (
        <span className="w-8">{recordingDuration.toFixed(1)}</span>
      )}
    </div>
  );
});

export default RecordingStatusField;
