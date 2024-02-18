import { MutableRefObject } from "react";

const drawCanvasFrame = (
  canvas: HTMLCanvasElement,
  analyser: AnalyserNode,
  dataArray: Uint8Array,
  animationIdRef: MutableRefObject<number | null>
) => {
  const canvasCtx = canvas.getContext("2d");

  if (!canvasCtx) {
    console.error("Unable to get 2D context for canvas");
    return;
  }

  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;

  analyser.getByteTimeDomainData(dataArray);

  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
  canvasCtx.beginPath();

  const sliceWidth = (WIDTH * 1.0) / dataArray.length;
  let x = 0;

  for (let i = 0; i < dataArray.length; i++) {
    const v = dataArray[i] / 128.0;
    const y = (v * HEIGHT) / 2;

    if (i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  canvasCtx.lineTo(canvas.width, canvas.height / 2);
  canvasCtx.stroke();

  animationIdRef.current = requestAnimationFrame(() =>
    drawCanvasFrame(canvas, analyser, dataArray, animationIdRef)
  );
};

export default drawCanvasFrame;
