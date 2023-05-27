import styles from './home-main.module.scss';
import { Search } from '@project/shared/ui';
import CardList from './card-list/card-list';
import { faker } from '@faker-js/faker';
import { useAuthRedux } from '@project/shared/hooks';


/* eslint-disable-next-line */

const createCardInfo = () => ({
  id: faker.string.uuid(),
  cardTitle: faker.person.jobTitle(),
  cardImgUrl: faker.image.urlLoremFlickr({ category: 'sports' }),
  description: faker.lorem.words(20),
});

const createCards = (count: number) => {
  return Array.from({ length: count }).map(createCardInfo);
};

const MOCK_CARDS = createCards(10);

export interface HomeMainProps {}

export function HomeMain(props: HomeMainProps) {
  const { user } = useAuthRedux();

  return (
    <div className={styles.container}>
      <Search />
      <CardList list={MOCK_CARDS} />
    </div>
  );
}

export default HomeMain;
