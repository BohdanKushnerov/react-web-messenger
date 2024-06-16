import { FC } from 'react';

import VideoComponent from '../VideoComponent/VideoComponent';

import { ILinkMessageProps } from '@interfaces/ILinkMessageProps';

const LinkMessage: FC<ILinkMessageProps> = ({ textContentMsg, isVideo }) => {
  return (
    <>
      <a
        className="text-decoration-line: w-full break-all text-nearBlackBlue transition-colors duration-150 hover:text-extraDarkBlue hover:underline dark:text-ultraDarkZinc hover:dark:text-darkZinc"
        href={
          textContentMsg.startsWith('https://')
            ? textContentMsg
            : 'https://' + textContentMsg
        }
        target="_blank"
        rel="noreferrer noopener"
      >
        {textContentMsg}
      </a>
      {isVideo && <VideoComponent source={textContentMsg} />}
    </>
  );
};

export default LinkMessage;
