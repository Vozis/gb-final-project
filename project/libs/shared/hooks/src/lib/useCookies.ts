import { useState } from 'react';

import Cookies from 'js-cookie';

export const useCookies = () => {
  const [value, setValue] = useState<string | null>();

  const setCookie = (key: string, value: string) => {
    Cookies.set(key, JSON.stringify(value));
    setValue(value);
  };

  const getCookie = (key: string) => {
    const value = Cookies.get(key);
    setValue(value ? JSON.parse(value) : null);
    return value ? JSON.parse(value) : null;
  };

  const removeCookie = (key: string) => {
    Cookies.remove(key);
    setValue(null);
  };

  return { value, removeCookie, getCookie, setCookie };
};
