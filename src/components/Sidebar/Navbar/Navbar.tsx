import type { FC } from 'react';
import { Suspense, lazy, useState } from 'react';

import Button from '@components/common/Button/Button';
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
      <Button
        variant="navBar"
        type="button"
        onClick={handleToggleModal}
        ariaLabel="Navbar"
      >
        <SvgIcon
          className="fill-ultraDarkZinc dark:fill-mediumZinc"
          iconId={IconId.IconMenu}
          size={32}
        />
      </Button>
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
