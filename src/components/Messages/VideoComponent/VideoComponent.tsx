import { FC } from 'react';
import ReactPlayer from 'react-player';
import urlParser from 'js-video-url-parser';

interface IVideoComponentProps {
  source: string;
}

const VideoComponent: FC<IVideoComponentProps> = ({ source }) => {
  // console.log('source', source);

  // const example = {
  //   channel: 'melodicdeepfreedownloads',
  //   id: 'free-download-portishead-roads-burcak-remix',
  //   mediaType: 'track',
  //   provider: 'soundcloud',
  // };

  // const q = 'https://djinni.co/jobs/my/';

  // console.log(q, urlRegex.test(q));

  const info = urlParser.parse(
    source
    // 'http://www.youtube.com/watch?v=HRb7B9fPhfA'
    // 'http://www.youtube.com/watch?v=HRb7B9fPhfA'
    // 'https://firebasestorage.googleapis.com/v0/b/react-web-messenger-dc6c4.appspot.com/o/audio%2Fwebm%2FJdvXZvVfFfPe3igqScNwqRFxzFl1%2F6695ae76-a39f-493e-86c1-35e98a0ba971.webm?alt=media&token=8a3e84a8-5040-4ada-976a-a81ed501eb53' // info undefined
    // 'http://www.youtube.com/watch?v=HRb7B9fPhfA' // {id: 'HRb7B9fPhfA', mediaType: 'video', provider: 'youtube'}
    // 'https://soundcloud.com/melodicdeepfreedownloads/free-download-portishead-roads-burcak-remix'
    // 'https://www.npmjs.com/package/js-video-url-parser' // info undefined
  );
  // const info = urlParser.parse(source);

  console.log('info', info);

  // if (source.includes('video') || info?.mediaType === 'video') {
  return <ReactPlayer width="100%" controls url={source} />;
  // }
};

export default VideoComponent;
