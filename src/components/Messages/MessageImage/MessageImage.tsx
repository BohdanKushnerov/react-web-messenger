import { FC, useEffect, useState } from 'react';

import calculateMsgImageWidth from '@utils/messages/calculateMsgImageWidth';
import calculateMsgImageHeight from '@utils/messages/calculateMsgImageHeight';
import { IFile } from '@interfaces/IFile';
import { IMessageImageProps } from '@interfaces/IMessageImageProps';

const MessageImage: FC<IMessageImageProps> = ({
  msg,
  file,
  index,
  handleClickPhoto,
}) => {
  const [loading, setLoading] = useState(true);

  const fetchImage = (src: string) => {
    const loadingImage = new Image();
    loadingImage.src = src;
    loadingImage.onload = () => {
      setLoading(false);
    };
  };

  useEffect(() => {
    fetchImage(file.url);
  }, [file.url]);

  const files: IFile[] = msg.data().file;

  const imgHeight = calculateMsgImageHeight(files, file, index);
  const imgWidth = calculateMsgImageWidth(files, file, index);

  return (
    <div
      style={{
        backgroundColor: `${loading ? 'gray' : ''}`,
        filter: `${loading ? 'blur(15px)' : ''}`,
        transition: '500ms filter linear',
      }}
    >
      <button
        className={`${
          loading ? 'invisible' : 'block'
        } cursor-pointer overflow-hidden rounded-md object-cover`}
        style={{
          height: imgHeight,
          width: imgWidth,
          filter: `${loading ? 'blur(20px)' : ''}`,
          transition: '1s filter linear',
        }}
        onClick={() => handleClickPhoto(index)}
      >
        <img src={file.url} alt={file.type} loading="lazy" id="img" />
      </button>
    </div>
  );
};

export default MessageImage;
