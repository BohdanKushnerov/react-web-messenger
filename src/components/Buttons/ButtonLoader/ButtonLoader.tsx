import { FC } from 'react'
import { ClipLoader } from 'react-spinners';

const ButtonLoader: FC = () => {
  return (
    <ClipLoader
      color={"rgb(63 63 70)"}
      size={15}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}

export default ButtonLoader