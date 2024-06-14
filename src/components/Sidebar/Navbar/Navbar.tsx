import { FC, Suspense, lazy, useState } from 'react';

import LoaderUIActions from '@components/LoaderUIActions/LoaderUIActions';
const NavbarModal = lazy(
  () => import('@components/Modals/NavbarModal/NavbarModal')
);
import sprite from '@assets/sprite.svg';

const Navbar: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  return (
    <div>
      <button
        className="relative w-12 h-10 flex justify-center items-center bg-transparent transition-all duration-300 hover:bg-mediumZinc hover:dark:bg-veryLightZincOpacity10 rounded-full cursor-pointer"
        onClick={handleToggleModal}
      >
        <svg
          width={32}
          height={32}
          className="fill-ultraDarkZinc dark:fill-mediumZinc"
        >
          <use href={sprite + '#icon-menu'} />
        </svg>
      </button>
      <Suspense
        fallback={
          <div className="absolute top-2 left-4">
            <LoaderUIActions size={40} />
          </div>
        }
      >
        {isModalOpen && <NavbarModal handleToggleModal={handleToggleModal} />}
      </Suspense>
    </div>
  );
};

export default Navbar;
