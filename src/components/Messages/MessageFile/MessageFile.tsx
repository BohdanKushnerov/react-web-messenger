import type { FC } from 'react';

import AudioComponent from '../AudioComponent/AudioComponent';
import FileComponent from '../FileComponent/FileComponent';
import VideoComponent from '../VideoComponent/VideoComponent';

import type { FileFromStorage } from 'types/FileFromStorage';

interface IMessageFileProps {
  file: FileFromStorage;
}
const MessageFile: FC<IMessageFileProps> = ({ file }) => {
  if (file.type.includes('video')) {
    return (
      <div className="w-160px md:w-200px lg:min-w-min lg:max-w-[400px] xl:max-w-[600px] 2xl:lg:min-w-min">
        <VideoComponent source={file.url} />
      </div>
    );
  }

  if (file.type.includes('audio')) {
    return <AudioComponent audioUrl={file.url} />;
  }

  return <FileComponent file={file} />;
};

export default MessageFile;
