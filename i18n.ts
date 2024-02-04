import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const currentLanguage = localStorage.getItem('language');

const resources = {
  en: {
    translation: {
      MonthNames: {
        January: 'January',
        February: 'February',
        March: 'March',
        April: 'April',
        May: 'May',
        June: 'June',
        July: 'July',
        August: 'August',
        September: 'September',
        October: 'October',
        November: 'November',
        December: 'December',
      },
      NavBar: {
        SignOut: 'Sign Out',
        ProfileSettings: 'Profile Settings',
        Theme: 'Theme',
        Light: 'Light',
        Dark: 'Dark',
        Language: 'Language',
        English: 'English',
        Ukrainian: 'Ukrainian',
        Russian: 'Russian',
      },
      ProfileSettings: {
        Phone: 'Phone:',
        ChangeName: 'Change Name',
        ChangeNameNotify: 'Start change username and button will be enable',
        Modal: {
          ChangeProfilePhotoPrompt:
            "If you're satisfied, click the 'Change Profile Photo' button, or close the window and try a new photo",
          ChangeProfilePhoto: 'Change profile photo',
        },
      },
      ChatForm: {
        ChatInputPlaceholder: 'Write your message...',
        EditMessage: 'Edit message',
        EmptyMessage: 'Empty message... =)',
      },
      ContextMenu: {
        Edit: 'EDIT',
        Copy: 'COPY',
        Delete: 'DELETE',
      },
      FileInput: {
        Files: 'file(s)',
        ImageCaptionPlaceholder: 'Add a caption...',
        Send: 'Send',
      },
      ChatListUnreadMsg: {
        UnreadMessage: 'unread message!',
        UnreadMessages: 'unread messages!',
      },
      Toasts: {
        DeleteMessageSuccess: 'Message successfully deleted!',
        EditingMessageSuccess: 'Message successfully edited!',
        CopyToClipboard: 'Copied to Clipboard!',
      },
      Search: 'Search...',
      EmptyChatNofify: 'Select or search user who you would to start messaging',
      SearchMsgPlaceholder: 'Enter text (case-sensitive)',
      NotFoundMsg: 'Not found messages, change search value',
      Offline: 'Offline',
      Online: 'Online',
      Typing: 'typing',
    },
  },
  ua: {
    translation: {
      MonthNames: {
        January: 'Січень',
        February: 'Лютий',
        March: 'Березень',
        April: 'Квітень',
        May: 'Травень',
        June: 'Червень',
        July: 'Липень',
        August: 'Серпень',
        September: 'Вересень',
        October: 'Жовтень',
        November: 'Листопад',
        December: 'Грудень',
      },
      NavBar: {
        SignOut: 'Вийти з аккаунта',
        ProfileSettings: 'Налаштування профілю',
        Theme: 'Тема',
        Light: 'Світла',
        Dark: 'Темна',
        Language: 'Мова',
        English: 'Англійська',
        Ukrainian: 'Українська',
        Russian: 'Російська',
      },
      ProfileSettings: {
        Phone: 'Телефон:',
        ChangeName: "Змінити ім'я",
        ChangeNameNotify:
          "Почніть змінювати ім'я користувача, і кнопка буде увімкнена",
        Modal: {
          ChangeProfilePhotoPrompt:
            "Якщо ви задоволені, натисніть кнопку 'Змінити фото профілю' або закрийте вікно і спробуйте нове фото",
          ChangeProfilePhoto: 'Змінити фото профілю',
        },
      },
      ChatForm: {
        ChatInputPlaceholder: 'Напиши своє повідомлення...',
        EditMessage: 'Редагувати повідомлення',
        EmptyMessage: 'Порожнє повідомлення... =)',
      },
      ContextMenu: {
        Edit: 'РЕДАГУВАТИ',
        Copy: 'КОПІЮВАТИ',
        Delete: 'ВИДАЛИТИ',
      },
      FileInput: {
        Files: 'файл(и)',
        ImageCaptionPlaceholder: 'Додати підпис...',
        Send: 'Відправити',
      },
      ChatListUnreadMsg: {
        UnreadMessage: 'непрочитане повідомлення!',
        UnreadMessages: 'непрочитані повідомлення!',
      },
      Toasts: {
        DeleteMessageSuccess: 'Повідомлення успішно видалено!',
        EditingMessageSuccess: 'Повідомлення успішно відредаговано!',
        CopyToClipboard: 'Скопійовано в буфер обміну!',
      },
      Search: 'Пошук...',
      EmptyChatNofify:
        'Виберіть або знайдіть користувача, з яким ви хочете почати обмін повідомленнями',
      SearchMsgPlaceholder: 'Введіть текст (з урахуванням регістру)',
      NotFoundMsg: 'Повідомлення не знайдено, змініть значення пошуку',
      Offline: 'Офлайн',
      Online: 'Онлайн',
      Typing: 'друкує',
    },
  },
  ru: {
    translation: {
      MonthNames: {
        January: 'Январь',
        February: 'Февраль',
        March: 'Март',
        April: 'Апрель',
        May: 'Май',
        June: 'Июнь',
        July: 'Июль',
        August: 'Август',
        September: 'Сентябрь',
        October: 'Октябрь',
        November: 'Ноябрь',
        December: 'Декабрь',
      },
      NavBar: {
        SignOut: 'Выйти из аккаунта',
        ProfileSettings: 'Настройки профиля',
        Theme: 'Тема',
        Light: 'Светлая',
        Dark: 'Темная',
        Language: 'Язык',
        English: 'Английский',
        Ukrainian: 'Украинский',
        Russian: 'Русский',
      },
      ProfileSettings: {
        Phone: 'Телефон:',
        ChangeName: 'Изменить имя',
        ChangeNameNotify:
          'Начните изменять имя пользователя, и кнопка будет включена',
        Modal: {
          ChangeProfilePhotoPrompt:
            "Если вы удовлетворены, нажмите кнопку 'Изменить фото профиля' или закройте окно и попробуйте новое фото",
          ChangeProfilePhoto: 'Изменить фото профиля',
        },
      },
      ChatForm: {
        ChatInputPlaceholder: 'Напишите своё сообщение...',
        EditMessage: 'Редактировать сообщение',
        EmptyMessage: 'Пустое сообщение... =)',
      },
      ContextMenu: {
        Edit: 'РЕДАКТИРОВАТЬ',
        Copy: 'КОПИРОВАТЬ',
        Delete: 'УДАЛИТЬ',
      },
      FileInput: {
        Files: 'файл(ы)',
        ImageCaptionPlaceholder: 'Добавить подпись...',
        Send: 'Отправить',
      },
      ChatListUnreadMsg: {
        UnreadMessage: 'непрочитанное сообщение!',
        UnreadMessages: 'непрочитанных сообщения!',
      },
      Toasts: {
        DeleteMessageSuccess: 'Сообщение успешно удалено!',
        EditingMessageSuccess: 'Сообщение успешно отредактировано!',
        CopyToClipboard: 'Скопировано в буфер обмена!',
      },
      Search: 'Поиск...',
      EmptyChatNofify:
        'Выберите или найдите пользователя, с которым вы хотите начать обмен сообщениями',
      SearchMsgPlaceholder: 'Введите текст (с учетом регистра)',
      NotFoundMsg: 'Сообщения не найдены, измените значение поиска',
      Offline: 'Офлайн',
      Online: 'Онлайн',
      Typing: 'печатает',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: currentLanguage || 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
