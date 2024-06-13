const convertTimeWithZero = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const tensSeconds = Math.floor((seconds % 60) / 10);
  const unitsSeconds = Math.floor(seconds % 10);

  return `${minutes}:${tensSeconds}${unitsSeconds}`;
};

export default convertTimeWithZero;
