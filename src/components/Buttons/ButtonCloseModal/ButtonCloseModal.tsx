interface IButtonCloseModal {
  handleToggleModal: ()=>void;
}

function ButtonCloseModal({ handleToggleModal }: IButtonCloseModal) {
  return (
    <>
      <button
        className="absolute top-2 left-2 w-8 h-8 flex justify-center items-center border-2 border-white rounded-full hover:shadow-mainShadow hover:bg-gray-800 cursor-pointer"
        onClick={handleToggleModal}
      >
        <svg
          fill="#FFFFFF"
          height="15px"
          width="15px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
        >
          <g>
            <g>
              <polygon
                points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 
			512,452.922 315.076,256 		"
              />
            </g>
          </g>
        </svg>
      </button>
    </>
  );
}

export default ButtonCloseModal;
