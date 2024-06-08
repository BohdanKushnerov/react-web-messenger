import sprite from '@assets/sprite.svg';

const SendMessage = () => {
  return (
    <button
      className="flex justify-center items-center h-12 w-12 bg-transparent transition-all duration-300 hover:bg-zinc-100/20 hover:dark:bg-zinc-100/10 rounded-full cursor-pointer"
      type="submit"
      aria-label="Send message"
    >
      <svg width={24} height={24} className="fill-zinc-200 dark:fill-zinc-400">
        <use href={sprite + '#icon-send-message'} />
      </svg>
    </button>
  );
};

export default SendMessage;
