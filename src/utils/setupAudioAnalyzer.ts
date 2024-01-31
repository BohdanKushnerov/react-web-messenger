import { MutableRefObject, RefObject } from "react";

import drawCanvasFrame from "./drawCanvasFrame";

const setupAudioAnalyzer = (
  streamData: MediaStream,
  canvasRef: RefObject<HTMLCanvasElement>,
  analyserRef: MutableRefObject<AnalyserNode | null>,
  animationIdRef: MutableRefObject<number | null>
) => {
  const audioContext = new window.AudioContext();
  const analyser = audioContext.createAnalyser();
  const source = audioContext.createMediaStreamSource(streamData);

  source.connect(analyser);
  analyser.fftSize = 256;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  analyserRef.current = analyser;

  const canvas = canvasRef.current;

  if (canvas) {
    drawCanvasFrame(canvas, analyser, dataArray, animationIdRef);
  }
};

export default setupAudioAnalyzer;
