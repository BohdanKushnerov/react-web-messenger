import { urlRegex } from '@constants/urlRegex';

const isLinkMessage = (string: string) => {
  return urlRegex.test(string);
};

export default isLinkMessage;
