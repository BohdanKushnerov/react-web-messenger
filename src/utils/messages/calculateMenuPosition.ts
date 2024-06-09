const calculateMenuPosition = (
  chatContainerEl: HTMLElement,
  clientX: number,
  clientY: number
) => {
  const rect = chatContainerEl.getBoundingClientRect();
  const containerTop = rect?.top ?? 0;
  const containerLeft = rect?.left ?? 0;
  const menuWidth = 224;
  const menuHeight = 224;

  const left =
    clientX - containerLeft + menuWidth > chatContainerEl.clientWidth
      ? clientX - containerLeft - menuWidth - 13
      : clientX - containerLeft - 13;

  const top =
    clientY - containerTop + menuHeight > chatContainerEl.clientHeight
      ? clientY - containerTop - menuHeight + 70 - 50
      : clientY - containerTop + 60 - 50;

  return { top, left };
};

export default calculateMenuPosition;
