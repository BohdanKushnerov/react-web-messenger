import type { FC } from 'react';
import ReactPlayer from 'react-player';

import getYouTubeVideoId from '@utils/messages/getYouTubeVideoId';

import { ElementsId } from '@enums/elementsId';

interface IVideoComponentProps {
  source: string;
}

const VideoComponent: FC<IVideoComponentProps> = ({ source }) => {
  if (source.includes('youtube')) {
    return (
      <iframe
        id={ElementsId.Player}
        title={getYouTubeVideoId(source)}
        width="100%"
        height={300}
        allowFullScreen
        src={`https://www.youtube.com/embed/${getYouTubeVideoId(source)}?showinfo=0&enablejsapi=1&origin=${window.location.hostname}`}
      />
    );
  }

  return <ReactPlayer width="100%" height={300} controls url={source} />;
};

export default VideoComponent;
