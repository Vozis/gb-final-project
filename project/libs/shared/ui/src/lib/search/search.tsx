import styles from './search.module.scss';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { IEvent } from '@project/shared/types';

/* eslint-disable-next-line */
export interface SearchProps {
  list: IEvent[];
}

export function Search({ list }: SearchProps) {
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState(list);
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const result = list.filter(item =>
      item.name.toLowerCase().includes(searchInput),
    );
    setSearchResult(result);
    console.log(searchResult);
  }, [list, searchInput]);

  return (
    <div className={clsx(styles.search)}>
      <form action="" method="get" className={styles.search__wrapper}>
        <input
          className={styles.search__input}
          name="search"
          placeholder="Поиск"
          type="text"
          value={searchInput}
          onChange={handleSearchInput}
        />
        <button className={styles.search__button} type="button">
          Filter
        </button>
      </form>
    </div>
  );
}

export default Search;
