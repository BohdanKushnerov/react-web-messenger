import { useEffect, useState } from 'react';

import { UseBlurLoadingImage } from 'types/hooks/UseBlurLoadingImage';

const useBlurLoadingImage: UseBlurLoadingImage = url => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (url === null) {
      setLoading(false);
      return;
    } else {
      const fetchImage = (src: string) => {
        const loadingImage = new Image();
        loadingImage.src = src;
        loadingImage.onload = () => {
          setLoading(false);
        };
      };

      fetchImage(url);
    }
  }, [url]);

  return loading;
};

export default useBlurLoadingImage;
