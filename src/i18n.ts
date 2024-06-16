import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

import {
  Auth,
  ChatForm,
  ChatListUnreadMsg,
  ContextMenu,
  FileInput,
  General,
  MonthNames,
  NavBar,
  ProfileSettings,
  Sidebar,
  Toasts,
} from './enums/i18nСonstants';

const currentLanguage = localStorage.getItem('language');

const resources = {
  en: {
    translation: {
      [Auth.Step]: 'Step',
      [Auth.Registration]: 'Registration',
      [Auth.EnterNumber]:
        'Enter your phone number and we will send you a confirmation code',
      [Auth.Continue]: 'Continue',
      [Auth.TestNumber]: 'Test number',
      [Auth.Code]: 'Code',
      [Auth.Verification]: 'Verification',
      [Auth.EnterDigits]: 'Enter 6 digits from the message we sent you',
      [Auth.Name]: 'Name',
      [Auth.Surname]: 'Surname',
      [Auth.InvalidPhoneNumber]: 'Invalid format phone number',
      [Auth.ReloadPage]: 'Reload page and try enter number again',
      [Auth.EmptyNameSurname]: 'Please fill in both name and surname',
      [Auth.InvalidVerificationCode]:
        'Invalid verification code. Please try again.',
      [Auth.UpdateProfileError]:
        'Unable to update profile. Please check your connection and try again.',
      [Auth.TooManyRequests]:
        'You have made too many attempts. Wait a moment and retry.',
      [Auth.ClearRegistrationForm]: 'Reset the registration form',
      [Auth.ResendSMS]: 'Send the SMS again',

      [ChatForm.ChatInputPlaceholder]: 'Write your message...',
      [ChatForm.EditMessage]: 'Edit message',
      [ChatForm.EmptyMessage]: 'Empty message... =)',

      [ChatListUnreadMsg.UnreadMessage]: 'unread message!',
      [ChatListUnreadMsg.UnreadMessages]: 'unread messages!',

      [ContextMenu.Edit]: 'EDIT',
      [ContextMenu.Copy]: 'COPY',
      [ContextMenu.Delete]: 'DELETE',
      [ContextMenu.Select]: 'SELECT',

      [FileInput.Files]: 'file(s)',
      [FileInput.ImageCaptionPlaceholder]: 'Add a caption...',
      [FileInput.Send]: 'Send',

      [General.Search]: 'Search...',
      [General.EmptyChatNotify]:
        'Select or search user who you would to start messaging',
      [General.SearchMsgPlaceholder]: 'Enter text (case-sensitive)',
      [General.NotFoundMsg]: 'Not found messages, change search value',
      [General.Offline]: 'Offline',
      [General.Online]: 'Online',
      [General.Typing]: 'typing',
      [General.Time]: 'Time',
      [General.Volume]: 'Volume',
      [General.Edited]: 'edited',

      [MonthNames.January]: 'January',
      [MonthNames.February]: 'February',
      [MonthNames.March]: 'March',
      [MonthNames.April]: 'April',
      [MonthNames.May]: 'May',
      [MonthNames.June]: 'June',
      [MonthNames.July]: 'July',
      [MonthNames.August]: 'August',
      [MonthNames.September]: 'September',
      [MonthNames.October]: 'October',
      [MonthNames.November]: 'November',
      [MonthNames.December]: 'December',

      [NavBar.SignOut]: 'Sign Out',
      [NavBar.ProfileSettings]: 'Profile Settings',
      [NavBar.Theme]: 'Theme',
      [NavBar.Light]: 'Light',
      [NavBar.Dark]: 'Dark',
      [NavBar.Language]: 'Language',
      [NavBar.English]: 'English',
      [NavBar.Ukrainian]: 'Ukrainian',
      [NavBar.Russian]: 'Russian',

      [ProfileSettings.Phone]: 'Phone:',
      [ProfileSettings.ChangeName]: 'Change Name',
      [ProfileSettings.ChangeNameNotify]:
        'Start change username and button will be enable',
      [ProfileSettings.ChangeNameToastSuccess]: 'Change profile name success',
      [ProfileSettings.ChangeNameToastError]: 'Change profile name error',
      [ProfileSettings.ChangePhotoToastSuccess]: 'Change photo profile success',
      [ProfileSettings.ChangePhotoToastError]: 'Change photo profile error',
      [ProfileSettings.ModalChangeProfilePhotoPrompt]:
        "If you're satisfied, click the 'Change Profile Photo' button, or close the window and try a new photo",
      [ProfileSettings.ModalChangeProfilePhoto]: 'Change profile photo',

      [Sidebar.NoChats]: "Sorry, but you don't have any chats yet 😔",
      [Sidebar.UsersNotFound]: 'Users not found.',

      [Toasts.DeleteMessageSuccess]: 'Message(s) successfully deleted!',
      [Toasts.DeleteMessageError]: 'Message(s) deleting error!',
      [Toasts.EditingMessageSuccess]: 'Message successfully edited!',
      [Toasts.EditingMessageError]: 'Message editing error!',
      [Toasts.CopyToClipboard]: 'Copied to Clipboard!',
    },
  },
  ua: {
    translation: {
      [Auth.Step]: 'Крок',
      [Auth.Registration]: 'Реєстрація',
      [Auth.EnterNumber]:
        'Введіть свій номер телефону і ми надішлемо вам код підтвердження',
      [Auth.Continue]: 'Продовжити',
      [Auth.TestNumber]: 'Тестовий номер',
      [Auth.Code]: 'Код',
      [Auth.Verification]: 'Підтвердження',
      [Auth.EnterDigits]:
        'Введіть 6 цифр з повідомлення, яке ми вам відправили',
      [Auth.Name]: "Ім'я",
      [Auth.Surname]: 'Прізвище',
      [Auth.InvalidPhoneNumber]: 'Невірний формат номеру телефону',
      [Auth.ReloadPage]:
        'Перезавантажте сторінку і спробуйте ввести номер знову',
      [Auth.EmptyNameSurname]:
        "Будь ласка, заповніть обидва поля: ім'я та прізвище",
      [Auth.InvalidVerificationCode]:
        'Неправильний код підтвердження. Будь ласка, спробуйте ще раз.',
      [Auth.UpdateProfileError]:
        "Не вдається оновити профіль. Перевірте з'єднання і спробуйте ще раз.",
      [Auth.TooManyRequests]:
        'Зроблено занадто багато спроб. Зачекайте трохи і повторіть спробу.',
      [Auth.ClearRegistrationForm]: 'Скинути форму реєстрації',
      [Auth.ResendSMS]: 'Повторно надіслати SMS',

      [ChatForm.ChatInputPlaceholder]: 'Напиши своє повідомлення...',
      [ChatForm.EditMessage]: 'Редагувати повідомлення',
      [ChatForm.EmptyMessage]: 'Порожнє повідомлення... =)',

      [ChatListUnreadMsg.UnreadMessage]: 'непрочитане повідомлення!',
      [ChatListUnreadMsg.UnreadMessages]: 'непрочитані повідомлення!',

      [ContextMenu.Edit]: 'РЕДАГУВАТИ',
      [ContextMenu.Copy]: 'КОПІЮВАТИ',
      [ContextMenu.Delete]: 'ВИДАЛИТИ',
      [ContextMenu.Select]: 'ВИБРАТИ',

      [FileInput.Files]: 'файл(и)',
      [FileInput.ImageCaptionPlaceholder]: 'Додати підпис...',
      [FileInput.Send]: 'Відправити',

      [General.Search]: 'Пошук...',
      [General.EmptyChatNotify]:
        'Виберіть або знайдіть користувача, з яким ви хочете почати обмін повідомленнями',
      [General.SearchMsgPlaceholder]: 'Введіть текст (з урахуванням регістру)',
      [General.NotFoundMsg]:
        'Повідомлення не знайдено, змініть значення пошуку',
      [General.Offline]: 'Офлайн',
      [General.Online]: 'Онлайн',
      [General.Typing]: 'друкує',
      [General.Time]: 'Час',
      [General.Volume]: 'Гучність',
      [General.Edited]: 'змінено',

      [MonthNames.January]: 'Січень',
      [MonthNames.February]: 'Лютий',
      [MonthNames.March]: 'Березень',
      [MonthNames.April]: 'Квітень',
      [MonthNames.May]: 'Травень',
      [MonthNames.June]: 'Червень',
      [MonthNames.July]: 'Липень',
      [MonthNames.August]: 'Серпень',
      [MonthNames.September]: 'Вересень',
      [MonthNames.October]: 'Жовтень',
      [MonthNames.November]: 'Листопад',
      [MonthNames.December]: 'Грудень',

      [NavBar.SignOut]: 'Вийти з аккаунта',
      [NavBar.ProfileSettings]: 'Налаштування профілю',
      [NavBar.Theme]: 'Тема',
      [NavBar.Light]: 'Світла',
      [NavBar.Dark]: 'Темна',
      [NavBar.Language]: 'Мова',
      [NavBar.English]: 'Англійська',
      [NavBar.Ukrainian]: 'Українська',
      [NavBar.Russian]: 'Російська',

      [ProfileSettings.Phone]: 'Телефон:',
      [ProfileSettings.ChangeName]: "Змінити ім'я",
      [ProfileSettings.ChangeNameNotify]:
        "Почніть змінювати ім'я користувача, і кнопка буде увімкнена",
      [ProfileSettings.ChangeNameToastSuccess]: 'Зміна імені профілю успішна',
      [ProfileSettings.ChangeNameToastError]: 'Помилка зміни імені профілю',
      [ProfileSettings.ChangePhotoToastSuccess]: 'Зміна фото профілю успішна',
      [ProfileSettings.ChangePhotoToastError]: 'Помилка зміни фото профілю',
      [ProfileSettings.ModalChangeProfilePhotoPrompt]:
        "Якщо ви задоволені, натисніть кнопку 'Змінити фото профілю' або закрийте вікно і спробуйте нове фото",
      [ProfileSettings.ModalChangeProfilePhoto]: 'Змінити фото профілю',

      [Sidebar.NoChats]: 'Шкода, але на жаль, у вас ще немає жодного чату 😔',
      [Sidebar.UsersNotFound]: 'Користувачів не знайдено.',

      [Toasts.DeleteMessageSuccess]: 'Повідомлення успішно видалено(і)!',
      [Toasts.DeleteMessageError]: 'Помилка видалення повідомлення(ь)!',
      [Toasts.EditingMessageSuccess]: 'Повідомлення успішно відредаговано!',
      [Toasts.EditingMessageError]: 'Помилка редагування повідомлення!',
      [Toasts.CopyToClipboard]: 'Скопійовано в буфер обміну!',
    },
  },
  ru: {
    translation: {
      [Auth.Step]: 'Шаг',
      [Auth.Registration]: 'Регистрация',
      [Auth.EnterNumber]:
        'Введите ваш номер телефона, и мы отправим вам код подтверждения',
      [Auth.Continue]: 'Продолжить',
      [Auth.TestNumber]: 'Тестовый номер',
      [Auth.Code]: 'Код',
      [Auth.Verification]: 'Подтверждение',
      [Auth.EnterDigits]:
        'Введите 6 цифр из сообщения, которое мы вам отправили',
      [Auth.Name]: 'Имя',
      [Auth.Surname]: 'Фамилия',
      [Auth.InvalidPhoneNumber]: 'Неверный формат номера телефона',
      [Auth.ReloadPage]:
        'Перезагрузите страницу и попробуйте ввести номер еще раз',
      [Auth.EmptyNameSurname]: 'Пожалуйста, заполните оба поля: имя и фамилия',
      [Auth.InvalidVerificationCode]:
        'Неверный код подтверждения. Пожалуйста, попробуйте снова.',
      [Auth.UpdateProfileError]:
        'Не удается обновить профиль. Проверьте подключение и попробуйте снова.',
      [Auth.TooManyRequests]:
        'Слишком много попыток. Подождите немного и повторите попытку.',
      [Auth.ClearRegistrationForm]: 'Сбросить форму регистрации',
      [Auth.ResendSMS]: 'Повторно отправить SMS',

      [ChatForm.ChatInputPlaceholder]: 'Напишите своё сообщение...',
      [ChatForm.EditMessage]: 'Редактировать сообщение',
      [ChatForm.EmptyMessage]: 'Пустое сообщение... =)',

      [ChatListUnreadMsg.UnreadMessage]: 'непрочитанное сообщение!',
      [ChatListUnreadMsg.UnreadMessages]: 'непрочитанных сообщения!',

      [ContextMenu.Edit]: 'РЕДАКТИР.',
      [ContextMenu.Copy]: 'КОПИРОВАТЬ',
      [ContextMenu.Delete]: 'УДАЛИТЬ',
      [ContextMenu.Select]: 'ВЫБРАТЬ',

      [FileInput.Files]: 'файл(ы)',
      [FileInput.ImageCaptionPlaceholder]: 'Добавить подпись...',
      [FileInput.Send]: 'Отправить',

      [General.Search]: 'Поиск...',
      [General.EmptyChatNotify]:
        'Выберите или найдите пользователя, с которым вы хотите начать обмен сообщениями',
      [General.SearchMsgPlaceholder]: 'Введите текст (с учетом регистра)',
      [General.NotFoundMsg]: 'Сообщения не найдены, измените значение поиска',
      [General.Offline]: 'Офлайн',
      [General.Online]: 'Онлайн',
      [General.Typing]: 'печатает',
      [General.Time]: 'Время',
      [General.Volume]: 'Громкость',
      [General.Edited]: 'изменено',

      [MonthNames.January]: 'Январь',
      [MonthNames.February]: 'Февраль',
      [MonthNames.March]: 'Март',
      [MonthNames.April]: 'Апрель',
      [MonthNames.May]: 'Май',
      [MonthNames.June]: 'Июнь',
      [MonthNames.July]: 'Июль',
      [MonthNames.August]: 'Август',
      [MonthNames.September]: 'Сентябрь',
      [MonthNames.October]: 'Октябрь',
      [MonthNames.November]: 'Ноябрь',
      [MonthNames.December]: 'Декабрь',

      [NavBar.SignOut]: 'Выйти из аккаунта',
      [NavBar.ProfileSettings]: 'Настройки профиля',
      [NavBar.Theme]: 'Тема',
      [NavBar.Light]: 'Светлая',
      [NavBar.Dark]: 'Темная',
      [NavBar.Language]: 'Язык',
      [NavBar.English]: 'Английский',
      [NavBar.Ukrainian]: 'Украинский',
      [NavBar.Russian]: 'Русский',

      [ProfileSettings.Phone]: 'Телефон:',
      [ProfileSettings.ChangeName]: 'Изменить имя',
      [ProfileSettings.ChangeNameNotify]:
        'Начните изменять имя пользователя, и кнопка будет включена',
      [ProfileSettings.ChangeNameToastSuccess]: 'Смена имени профиля успешна',
      [ProfileSettings.ChangeNameToastError]: 'Ошибка смены имени профиля',
      [ProfileSettings.ChangePhotoToastSuccess]: 'Смена фото профиля успешна',
      [ProfileSettings.ChangePhotoToastError]: 'Ошибка смены фото профиля',
      [ProfileSettings.ModalChangeProfilePhotoPrompt]:
        "Если вы удовлетворены, нажмите кнопку 'Изменить фото профиля' или закройте окно и попробуйте новое фото",
      [ProfileSettings.ModalChangeProfilePhoto]: 'Изменить фото профиля',

      [Sidebar.NoChats]: 'Жаль, но у вас пока нет ни одного чата 😔',
      [Sidebar.UsersNotFound]: 'Пользователи не найдены.',

      [Toasts.DeleteMessageSuccess]: 'Сообщение(я) успешно удалено(ы)!',
      [Toasts.DeleteMessageError]: 'Ошибка удаления сообщения(й)!',
      [Toasts.EditingMessageSuccess]: 'Сообщение успешно отредактировано!',
      [Toasts.EditingMessageError]: 'Ошибка исправления сообщения!',
      [Toasts.CopyToClipboard]: 'Скопировано в буфер обмена!',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: currentLanguage ?? 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
