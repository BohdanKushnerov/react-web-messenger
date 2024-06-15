import { MutableRefObject } from 'react';

const clearCanvas = (
  canvasCtx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  canvasCtx.clearRect(0, 0, width, height);
};

const drawWaveform = (
  canvasCtx: CanvasRenderingContext2D,
  dataArray: Uint8Array,
  width: number,
  height: number
) => {
  canvasCtx.beginPath();

  const sliceWidth = (width * 1.0) / dataArray.length;
  let x = 0;

  for (let i = 0; i < dataArray.length; i++) {
    const v = dataArray[i] / 128.0;
    const y = (v * height) / 2;

    if (i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  canvasCtx.lineTo(width, height / 2);
  canvasCtx.stroke();
};

const drawCanvasFrame = (
  canvas: HTMLCanvasElement,
  analyser: AnalyserNode,
  dataArray: Uint8Array,
  animationIdRef: MutableRefObject<number | null>
) => {
  const canvasCtx = canvas.getContext('2d');

  if (!canvasCtx) {
    console.error('Unable to get 2D context for canvas');
    return;
  }

  const width = canvas.width;
  const height = canvas.height;

  analyser.getByteTimeDomainData(dataArray);

  clearCanvas(canvasCtx, width, height);
  drawWaveform(canvasCtx, dataArray, width, height);

  animationIdRef.current = requestAnimationFrame(() =>
    drawCanvasFrame(canvas, analyser, dataArray, animationIdRef)
  );
};

export default drawCanvasFrame;
