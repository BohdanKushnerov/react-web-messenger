import Avatar from 'react-avatar';

import { IAvatarProfileProps } from '@interfaces/IAvatarProfileProps';

function AvatarProfile({ photoURL, displayName, size }: IAvatarProfileProps) {
  return photoURL ? (
    <img
      className="rounded-full"
      width={size}
      height={size}
      src={photoURL}
      alt={displayName}
    />
  ) : (
    <Avatar
      className="rounded-full"
      name={`${displayName}`}
      size={size}
      textSizeRatio={0}
    />
  );
}

export default AvatarProfile;
