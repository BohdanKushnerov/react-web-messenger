import { useEffect, useState } from 'react';

const useStartTransition = () => {
  const [startTransition, setStartTransition] = useState(false);

  useEffect(() => {
    setStartTransition(true);

    return () => {
      setStartTransition(false);
    };
  }, []);

  return startTransition;
};

export default useStartTransition;
