import { useCallback, useEffect, useRef, useState } from 'react';

const useAuthResendVerifyCode = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [timer, setTimer] = useState<number>(30);

  const timerId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer > 0) {
      timerId.current = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    } else {
      setIsButtonDisabled(false);
    }

    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, [timer]);

  const handleResetTimer = useCallback(() => {
    setIsButtonDisabled(true);
    setTimer(30);
  }, []);

  return { timer, isButtonDisabled, handleResetTimer };
};

export default useAuthResendVerifyCode;
