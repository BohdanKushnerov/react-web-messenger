import Avatar from 'react-avatar';

import { IAvatarProfile } from '@interfaces/IAvatarProfile';

function AvatarProfile({ photoURL, displayName, size }: IAvatarProfile) {
  return photoURL ? (
    <img
      className="rounded-full"
      width={size}
      height={size}
      src={photoURL}
      alt={displayName}
    />
  ) : (
    <Avatar className="rounded-full" name={`${displayName}`} size={size} />
  );
}

export default AvatarProfile;
