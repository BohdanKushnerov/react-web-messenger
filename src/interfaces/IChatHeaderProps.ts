import { AppScreenType } from 'types/AppScreenType';

export interface IChatHeaderProps {
  handleClickBackToSidebarScreen: () => void;
  setScreen?: (value: AppScreenType) => void;
  setIsShowSearchMessages: (value: boolean) => void;
}
