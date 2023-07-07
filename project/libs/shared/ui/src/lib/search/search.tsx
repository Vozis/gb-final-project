import styles from './search.module.scss';
import clsx from 'clsx';
import React from 'react';

/* eslint-disable-next-line */
export interface SearchProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
}

export function Search({ setSearchInput, searchInput }: SearchProps) {
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className={clsx(styles.search)}>
      <form action="" method="get" className={styles.search__wrapper}>
        <input
          className={styles.search__input}
          name="s"
          placeholder="Поиск"
          type="text"
          defaultValue={searchInput}
          onChange={handleSearchInput}
        />
        {/*<button className={styles.search__button} type="submit">*/}
        {/*  Filter*/}
        {/*</button>*/}
      </form>
    </div>
  );
}

export default Search;
