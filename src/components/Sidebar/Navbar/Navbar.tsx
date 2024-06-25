import { FC, Suspense, lazy, useState } from 'react';

import LoaderUIActions from '@components/common/LoaderUIActions/LoaderUIActions';
import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import { IconId } from '@enums/iconsSpriteId';

const NavbarModal = lazy(
  () => import('@components/Modals/NavbarModal/NavbarModal')
);

const Navbar: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  return (
    <div>
      <button
        className="relative flex h-10 w-12 cursor-pointer items-center justify-center rounded-full bg-transparent transition-all duration-300 hover:bg-mediumZinc hover:dark:bg-veryLightZincOpacity10"
        type="button"
        onClick={handleToggleModal}
        aria-label="Navbar"
      >
        <SvgIcon
          className="fill-ultraDarkZinc dark:fill-mediumZinc"
          iconId={IconId.IconMenu}
          size={32}
        />
      </button>
      <Suspense
        fallback={
          <div className="absolute left-4 top-2">
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
