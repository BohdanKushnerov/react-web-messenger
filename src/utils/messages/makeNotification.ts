import { DocumentData } from 'firebase/firestore';

const makeNotification = (msg: DocumentData) => {
  new Notification('new Message', {
    body: msg.data().message,
  });

  const audio = document.getElementById('notify') as HTMLAudioElement;

  if (audio) {
    audio.play();
  }
};

export default makeNotification;
