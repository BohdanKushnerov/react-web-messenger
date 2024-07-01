import validUrl from 'valid-url';

const isLinkMessage = (string: string) => {
  return validUrl.isUri(string);
};

export default isLinkMessage;
