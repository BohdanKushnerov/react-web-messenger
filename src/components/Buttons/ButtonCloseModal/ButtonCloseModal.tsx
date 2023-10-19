import { IButtonCloseModalProps } from "@interfaces/IButtonCloseModalProps";
import sprite from '@assets/sprite.svg';

function ButtonCloseModal({ handleCloseModal }: IButtonCloseModalProps) {
  return (
    <>
      <button
        className="absolute top-2 left-2 w-8 h-8 flex justify-center items-center border-2 border-white rounded-full hover:shadow-mainShadow hover:bg-gray-800 cursor-pointer"
        onClick={handleCloseModal}
      >
        <svg width={16} height={16}>
          <use href={sprite + '#icon-cross-close'} fill="#FFFFFF" />
        </svg>
      </button>
    </>
  );
}

export default ButtonCloseModal;
