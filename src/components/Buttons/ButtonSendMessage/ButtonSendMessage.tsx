import sprite from '@assets/sprite.svg';

const SendMessage = () => {
  return (
    <button
      className="flex justify-center items-center h-12 w-12 bg-transparent transition-all duration-300 hover:bg-veryLightZincOpacity20 hover:dark:bg-veryLightZincOpacity10 rounded-full cursor-pointer"
      type="submit"
      aria-label="Send message"
    >
      <svg
        width={24}
        height={24}
        className="fill-mediumLightZinc dark:fill-mediumZinc"
      >
        <use href={sprite + '#icon-send-message'} />
      </svg>
    </button>
  );
};

export default SendMessage;
