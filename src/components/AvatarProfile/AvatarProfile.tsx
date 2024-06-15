import { FC } from 'react';
import Avatar from 'react-avatar';

import { IAvatarProfileProps } from '@interfaces/IAvatarProfileProps';

const AvatarProfile: FC<IAvatarProfileProps> = ({
  photoURL,
  displayName,
  size,
}) => {
  return photoURL && displayName && size ? (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        minHeight: `${size}px`,
      }}
    >
      <img
        className="h-full w-full rounded-full object-cover shadow-secondaryShadow transition-all duration-150 group-hover:scale-105"
        width={size}
        height={size}
        src={photoURL}
        alt={displayName}
      />
    </div>
  ) : (
    <Avatar
      className="rounded-full shadow-secondaryShadow transition-all duration-150 group-hover:scale-105"
      name={`${displayName}`}
      size={size}
      textSizeRatio={0}
    />
  );
};

export default AvatarProfile;
