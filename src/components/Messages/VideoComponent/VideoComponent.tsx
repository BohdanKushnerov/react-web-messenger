import { FC } from 'react';
import ReactPlayer from 'react-player';

import { IVideoComponentProps } from '@interfaces/IVideoComponentProps';

const VideoComponent: FC<IVideoComponentProps> = ({ source }) => {
  function getYouTubeVideoId(url: string) {
    const regExp: RegExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match && match[1] ? match[1] : null;
  }

  // console.log(window.location.hostname);

  if (source.includes('youtube')) {
    return (
      <iframe
        id="player"
        width="100%"
        height="auto"
        src={
          'https://www.youtube.com/embed/' +
          `${getYouTubeVideoId(source)}` +
          `?showinfo=0&enablejsapi=1&origin=${window.location.hostname}`
        }
      ></iframe>
    );
  } else {
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
