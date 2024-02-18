function truncateLastMessageString(inputString: string, maxLength: number) {
  if (!inputString) {
    return;
  }

  if (inputString.length <= maxLength) {
    return inputString;
  } else {
    return inputString.substring(0, maxLength) + '...';
  }
}

export default truncateLastMessageString;