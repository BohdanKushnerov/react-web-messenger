export interface IModalWindowProps {
  handleToggleModal: () => void;
  children: React.ReactNode;
  contentClasses?: string;
}