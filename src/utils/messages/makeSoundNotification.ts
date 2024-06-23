import { ElementsId } from '@enums/elementsId';

const makeSoundNotification = () => {
  const audio = document.getElementById(
    ElementsId.NotifyAudio
  ) as HTMLAudioElement;

  if (audio) {
    audio.play();
  }
};

export default makeSoundNotification;
