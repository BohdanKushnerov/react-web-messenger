import { TFunction } from 'i18next';

const formatDateForGroupMessages = (inputDate: string, t: TFunction) => {
  const dateObject = new Date(inputDate);
  const day = dateObject.getDate();

  const monthNames = [
    t('MonthNames.January'),
    t('MonthNames.February'),
    t('MonthNames.March'),
    t('MonthNames.April'),
    t('MonthNames.May'),
    t('MonthNames.June'),
    t('MonthNames.July'),
    t('MonthNames.August'),
    t('MonthNames.September'),
    t('MonthNames.October'),
    t('MonthNames.November'),
    t('MonthNames.December'),
  ];
  const monthName = monthNames[dateObject.getMonth()];

  const formattedDate = `${day} ${monthName}`;

  return formattedDate;
};

export default formatDateForGroupMessages;
