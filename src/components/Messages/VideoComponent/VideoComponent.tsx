import { FC } from 'react';
import ReactPlayer from 'react-player';

import getYouTubeVideoId from '@utils/messages/getYouTubeVideoId';
import { IVideoComponentProps } from '@interfaces/IVideoComponentProps';

const VideoComponent: FC<IVideoComponentProps> = ({ source }) => {
  if (source.includes('youtube')) {
    return (
      // ютуб видео через скидание ссылки в сообщение
      <iframe
        id="player"
        width="100%"
        height="300"
        allowFullScreen
        src={
          'https://www.youtube.com/embed/' +
          `${getYouTubeVideoId(source)}` +
          `?showinfo=0&enablejsapi=1&origin=${window.location.hostname}`
        }
      ></iframe>
    );
  } else {
    // остальные видео через скидание ссылки в сообщение
    return <ReactPlayer width="100%" controls url={source} />;
  }
};

export default VideoComponent;

// 'https://www.youtube.com/embed/' +
//   `${getYouTubeVideoId(source)}` +
//   `?showinfo=0&enablejsapi=1&origin=https://www.youtube.com`;

// return (
//   <ReactPlayer
//     width="100%"
//     controls
//     // url={source}
//     url={
//       'https://www.youtube.com/embed/' +
//       `${getYouTubeVideoId(source)}` +
//       `?showinfo=0&enablejsapi=1&origin=http://localhost:5173/react-web-messenger`
//     }
//     // config={{
//     //   youtube: {
//     //     playerVars: {
//     //       autoplay: 0,
//     //       controls: 1,
//     //       // autohide: 1,
//     //       // wmode: 'opaque',
//     //       origin:
//     //         'http://localhost:5173/react-web-messenger/pvVzLcewDxPb4oxVfu1H1VLNYSs1BAf0xOZjLfdMAhCnzjA3648sgUC3',
//     //     },
//     //   },
//     // }}
//   />
// );
