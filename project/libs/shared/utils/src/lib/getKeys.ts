export const getKeys = <T>(obj: T): (keyof T)[] => {
  // @ts-ignore
  return Object.keys(obj) as (keyof T)[];
};
