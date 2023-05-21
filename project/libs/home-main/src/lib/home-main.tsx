import styles from './home-main.module.scss';
import Card from './card/card';
import { faker } from '@faker-js/faker';
import { Search } from '@project/shared/ui';

/* eslint-disable-next-line */

const createCardInfo = () => ({
  id: faker.string.uuid(),
  username: faker.person.fullName(),
  avatarImgUrl: faker.image.avatar(),
  description: faker.lorem.words(20),
});

const createCards = (count: number) => {
  return Array.from({ length: count }).map(createCardInfo);
};

const MOCK_CARDS = createCards(10);

export interface HomeMainProps {}

//
export function HomeMain(props: HomeMainProps) {
  return (
    <div className={styles.container}>
      <Search />
      {MOCK_CARDS.map(card => (
        <Card
          key={card.id}
          id={card.id}
          username={card.username}
          avatarImgUrl={card.avatarImgUrl}
          description={card.description}
        />
      ))}
    </div>
  );
}

export default HomeMain;
