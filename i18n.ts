import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Ресурсы с переводами
const resources = {
  en: {
    translation: {
      Search: 'Search...',
      EmptyChatNofify: 'Select or search user who you would to start messaging',
      ChatInputPlaceholder: 'Write your message...',
      SearchMsgPlaceholder: 'Enter text (case-sensitive)',
      EditMessage: 'Edit message',
      EmptyMessage: 'Empty message... =)',
      Edit: 'EDIT',
      Copy: 'COPY',
      Delete: 'Delete',
      Offline: 'Offline',
      Online: 'Online',
      SignOut: 'Sign Out',
      ProfileSettings: 'Profile Settings',
      Light: 'Light',
      Dark: 'Dark',
      Phone: 'Phone:',
      ChangeNameNotify: 'Start change username and button will be enable',
    },
  },
  ua: {
    translation: {
      Search: 'Пошук...',
      EmptyChatNofify:
        'Виберіть або знайдіть користувача, з яким ви хочете почати обмін повідомленнями',
      ChatInputPlaceholder: 'Напиши своє повідомлення...',
      SearchMsgPlaceholder: 'Введіть текст (з урахуванням регістру)',
      EditMessage: 'Редагувати повідомлення',
      EmptyMessage: 'Порожнє повідомлення... =)',
      Edit: 'Редагувати',
      Copy: 'Копіювати',
      Delete: 'Видалити',
      Offline: 'Офлайн',
      Online: 'Онлайн',
      SignOut: 'Вийти з аккаунта',
      ProfileSettings: 'Налаштування профілю',
      Light: 'Світла',
      Dark: 'Темна',
      Phone: 'Телефон:',
      ChangeNameNotify:
        "Почніть змінювати ім'я користувача, і кнопка буде увімкнена",
    },
  },
};

i18n
  .use(initReactI18next) // используем react-i18next
  .init({
    resources,
    lng: 'ua', // язык по умолчанию
    interpolation: {
      escapeValue: false, // не экранировать строки
    },
  });

export default i18n;
