import { FC, Suspense, lazy, useState } from 'react';

const NavbarModal = lazy(
  () => import('@components/Modals/NavbarModal/NavbarModal')
);
import sprite from '@assets/sprite.svg';
import ButtonLoader from '@components/Buttons/ButtonLoader/ButtonLoader';

const Navbar: FC = () => {
  const [isModalOpen, setIsModelOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModelOpen(prev => !prev);
  };

  return (
    <div>
      <div
        className="relative w-12 h-10 flex justify-center items-center bg-transparent transition-all duration-300 hover:bg-zinc-300 hover:dark:bg-hoverGray rounded-full cursor-pointer"
        onClick={handleToggleModal}
      >
        <svg
          width={32}
          height={32}
          className="fill-zinc-600 dark:fill-zinc-400"
        >
          <use href={sprite + '#icon-menu'} />
        </svg>
      </div>
      <Suspense
        fallback={
          <div className="absolute top-2 left-4">
            <ButtonLoader size={40} />
          </div>
        }
      >
        {isModalOpen && <NavbarModal handleToggleModal={handleToggleModal} />}
      </Suspense>
    </div>
  );
};

export default Navbar;
