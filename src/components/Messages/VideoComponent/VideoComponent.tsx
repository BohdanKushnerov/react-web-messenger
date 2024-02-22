import { FC } from 'react';
import ReactPlayer from 'react-player';

import { IVideoComponentProps } from '@interfaces/IVideoComponentProps';

const VideoComponent: FC<IVideoComponentProps> = ({ source }) => {
  return <ReactPlayer width="100%" controls url={source} />;
};

export default VideoComponent;
