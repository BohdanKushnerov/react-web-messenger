import { useEffect, useState } from 'react';

import { UseBlurLoadingImage } from 'types/hooks/UseBlurLoadingImage';

const useBlurLoadingImage: UseBlurLoadingImage = url => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (url !== null) {
      const fetchImage = (src: string) => {
        const loadingImage = new Image();
        loadingImage.src = src;
        loadingImage.onload = () => {
          setLoading(false);
        };
      };
      fetchImage(url);
    } else {
      setLoading(false);
    }
  }, [url]);

  return loading;
};

export default useBlurLoadingImage;
