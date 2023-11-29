function formatDateForGroupMessages(inputDate: string) {
  const dateObject = new Date(inputDate);
  const day = dateObject.getDate();

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const monthName = monthNames[dateObject.getMonth()];

  const formattedDate = `${day} ${monthName}`;

  return formattedDate;
}

export default formatDateForGroupMessages;
