import { DocumentData } from 'firebase/firestore';

export interface IMessageImagesWithLightBoxProps {
  msg: DocumentData;
  indexClickedPhoto: number;
  handleClickPhoto: (index: number) => void;
}
