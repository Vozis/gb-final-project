import { useState } from 'react';

export const useUploadImage = () => {
  const [isNewImageAdd, setIsNewImageAdd] = useState<boolean>(false);
  const [result, setResult] = useState<string | ArrayBuffer | null>('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
};
