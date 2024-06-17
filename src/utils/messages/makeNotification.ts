import { toast } from 'react-toastify';

import { DocumentData } from 'firebase/firestore';

const makeNotification = (msg: DocumentData) => {
  toast.info(msg.data().message);

  new Notification('new Message', {
    body: msg.data().message,
  });

  const audio = document.getElementById('notify') as HTMLAudioElement;

  if (audio) {
    audio.play();
  }
};

export default makeNotification;
