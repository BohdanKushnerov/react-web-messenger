import type { FC } from 'react';

import VideoComponent from '../VideoComponent/VideoComponent';

interface ILinkMessageProps {
  textContentMessage: string;
  isVideo: boolean;
}
const LinkMessage: FC<ILinkMessageProps> = ({
  textContentMessage,
  isVideo,
}) => {
  return (
    <>
      <a
        className="text-decoration-line: w-full break-all text-nearBlackBlue transition-colors duration-150 hover:text-extraDarkBlue hover:underline dark:text-ultraDarkZinc hover:dark:text-darkZinc"
        href={
          textContentMessage.startsWith('https://')
            ? textContentMessage
            : `https://${textContentMessage}`
        }
        target="_blank"
        rel="noreferrer noopener"
      >
        {textContentMessage}
      </a>
      {isVideo && <VideoComponent source={textContentMessage} />}
    </>
  );
};

export default LinkMessage;
