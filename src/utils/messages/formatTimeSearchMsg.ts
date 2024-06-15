const formatTimeSearchMsg = (dateString: string) => {
  const currentLanguage = localStorage.getItem('language');

  if (currentLanguage) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString(
      currentLanguage === 'ua' ? 'uk' : currentLanguage,
      { month: 'short' }
    );
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedTime = `${day} ${month} ${year}, ${hours}:${
      minutes < 10 ? '0' : ''
    }${minutes}`;

    return formattedTime;
  }
};

export default formatTimeSearchMsg;
