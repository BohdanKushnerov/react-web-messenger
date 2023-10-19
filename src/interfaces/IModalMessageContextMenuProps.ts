export interface IModalMessageContextMenuProps {
  closeModal: () => void;
  modalPosition: {
    top: number;
    left: number;
  };
  children: React.ReactNode;
}