const getYouTubeVideoId = (url: string) => {
  const regExp: RegExp =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = regExp.exec(url);

  return match?.[1] ?? '';
};

export default getYouTubeVideoId;
