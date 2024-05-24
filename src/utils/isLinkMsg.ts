const isLinkMsg = (string: string) => {
  const urlRegex = /((?:https?:\/\/)?(?:www\.)?[^\s]+\.[^\s]+)/gi;

  return urlRegex.test(string);
};

export default isLinkMsg;
