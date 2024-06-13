export enum Auth {
  Step = 'Auth.Step',
  Registration = 'Auth.Registration',
  EnterNumber = 'Auth.EnterNumber',
  Continue = 'Auth.Continue',
  TestNumber = 'Auth.TestNumber',
  Code = 'Auth.Code',
  Verification = 'Auth.Verification',
  EnterDigits = 'Auth.EnterDigits',
  Name = 'Auth.Name',
  Surname = 'Auth.Surname',
  InvalidPhoneNumber = 'Auth.InvalidPhoneNumber',
  ReloadPage = 'Auth.ReloadPage',
  EmptyNameSurname = 'Auth.EmptyNameSurname',
  InvalidVerificationCode = 'Auth.InvalidVerificationCode',
  UpdateProfileError = 'Auth.UpdateProfileError',
  TooManyRequests = 'Auth.TooManyRequests',
  ClearRegistrationForm = 'Auth.ClearRegistrationForm',
  ResendSMS = 'Auth.ResendSMS',
}

export enum MonthNames {
  January = 'MonthNames.January',
  February = 'MonthNames.February',
  March = 'MonthNames.March',
  April = 'MonthNames.April',
  May = 'MonthNames.May',
  June = 'MonthNames.June',
  July = 'MonthNames.July',
  August = 'MonthNames.August',
  September = 'MonthNames.September',
  October = 'MonthNames.October',
  November = 'MonthNames.November',
  December = 'MonthNames.December',
}

export enum Sidebar {
  NoChats = 'Sidebar.NoChats',
  UsersNotFound = 'Sidebar.UsersNotFound',
}

export enum NavBar {
  SignOut = 'NavBar.SignOut',
  ProfileSettings = 'NavBar.ProfileSettings',
  Theme = 'NavBar.Theme',
  Light = 'NavBar.Light',
  Dark = 'NavBar.Dark',
  Language = 'NavBar.Language',
  English = 'NavBar.English',
  Ukrainian = 'NavBar.Ukrainian',
  Russian = 'NavBar.Russian',
}

export enum ProfileSettings {
  Phone = 'ProfileSettings.Phone',
  ChangeName = 'ProfileSettings.ChangeName',
  ChangeNameNotify = 'ProfileSettings.ChangeNameNotify',
  ChangeNameToastSuccess = 'ProfileSettings.ChangeNameToastSuccess',
  ChangeNameToastError = 'ProfileSettings.ChangeNameToastError',
  ChangePhotoToastSuccess = 'ProfileSettings.ChangePhotoToastSuccess',
  ChangePhotoToastError = 'ProfileSettings.ChangePhotoToastError',
  ModalChangeProfilePhotoPrompt = 'ProfileSettings.Modal.ChangeProfilePhotoPrompt',
  ModalChangeProfilePhoto = 'ProfileSettings.Modal.ChangeProfilePhoto',
}

export enum ChatForm {
  ChatInputPlaceholder = 'ChatForm.ChatInputPlaceholder',
  EditMessage = 'ChatForm.EditMessage',
  EmptyMessage = 'ChatForm.EmptyMessage',
}

export enum ContextMenu {
  Edit = 'ContextMenu.Edit',
  Copy = 'ContextMenu.Copy',
  Delete = 'ContextMenu.Delete',
  Select = 'ContextMenu.Select',
}

export enum FileInput {
  Files = 'FileInput.Files',
  ImageCaptionPlaceholder = 'FileInput.ImageCaptionPlaceholder',
  Send = 'FileInput.Send',
}

export enum ChatListUnreadMsg {
  UnreadMessage = 'ChatListUnreadMsg.UnreadMessage',
  UnreadMessages = 'ChatListUnreadMsg.UnreadMessages',
}

export enum Toasts {
  DeleteMessageSuccess = 'Toasts.DeleteMessageSuccess',
  DeleteMessageError = 'Toasts.DeleteMessageError',
  EditingMessageSuccess = 'Toasts.EditingMessageSuccess',
  EditingMessageError = 'Toasts.EditingMessageError',
  CopyToClipboard = 'Toasts.CopyToClipboard',
}

export enum General {
  Search = 'General.Search',
  EmptyChatNotify = 'General.EmptyChatNotify',
  SearchMsgPlaceholder = 'General.SearchMsgPlaceholder',
  NotFoundMsg = 'General.NotFoundMsg',
  Offline = 'General.Offline',
  Online = 'General.Online',
  Typing = 'General.Typing',
  Time = 'General.Time',
  Volume = 'General.Volume',
  Edited = 'General.Edited',
}
