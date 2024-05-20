import { MutableRefObject, RefObject } from 'react';

import drawCanvasFrame from './drawCanvasFrame';

const createAudioContext = (): AudioContext => {
  return new window.AudioContext();
};

const setupAnalyserNode = (audioContext: AudioContext): AnalyserNode => {
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;
  return analyser;
};

const connectAudioStream = (
  streamData: MediaStream,
  audioContext: AudioContext,
  analyser: AnalyserNode
): void => {
  const source = audioContext.createMediaStreamSource(streamData);
  source.connect(analyser);
};

const initializeCanvasDrawing = (
  canvas: HTMLCanvasElement,
  analyser: AnalyserNode,
  animationIdRef: MutableRefObject<number | null>
): void => {
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  drawCanvasFrame(canvas, analyser, dataArray, animationIdRef);
};

const setupAudioAnalyzer = (
  streamData: MediaStream,
  canvasRef: RefObject<HTMLCanvasElement>,
  analyserRef: MutableRefObject<AnalyserNode | null>,
  animationIdRef: MutableRefObject<number | null>
): void => {
  const audioContext = createAudioContext();
  const analyser = setupAnalyserNode(audioContext);

  connectAudioStream(streamData, audioContext, analyser);
  analyserRef.current = analyser;

  const canvas = canvasRef.current;

  if (canvas) {
    initializeCanvasDrawing(canvas, analyser, animationIdRef);
  }
};

export default setupAudioAnalyzer;
