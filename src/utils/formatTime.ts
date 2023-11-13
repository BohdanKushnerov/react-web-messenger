function formatTime(dateString: string) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const month = months[monthIndex];
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedTime = `${day < 10 ? '0' : ''}${day} ${month} ${hours}:${
    minutes < 10 ? '0' : ''
  }${minutes}`;
  return formattedTime;
}

export default formatTime;
