import styles from './search.module.scss';

/* eslint-disable-next-line */
export interface SearchProps {}

export function Search(props: SearchProps) {
  return (
    <div className={styles.search}>
      <form action="" method="get" className={styles.search__wrapper}>
        <input className={styles.search__input} name="s" placeholder="Search" type="text" />
          <button className={styles.search__button} type="submit">Filter</button>
      </form>
    </div>
  );
}

export default Search;
