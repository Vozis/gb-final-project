import { EventService } from '@project/shared/services';
import { Search } from '@project/shared/ui';
import { useQuery } from '@tanstack/react-query';
import CardList from './card-list/card-list';
import styles from './home-main.module.scss';

/* eslint-disable-next-line */

// const createCardInfo = () => ({
//   id: faker.string.uuid(),
//   cardTitle: faker.person.jobTitle(),
//   cardImgUrl: faker.image.urlLoremFlickr({ category: 'sports' }),
//   description: faker.lorem.words(20),
// });
//
// const createCards = (count: number) => {
//   return Array.from({ length: count }).map(createCardInfo);
// };
//
// const MOCK_CARDS = createCards(10);

export interface HomeMainProps {}

export function HomeMain(props: HomeMainProps) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['get-all-events'],
    queryFn: () => EventService.getAllEvents(),
  });
  console.log(data);
  return (
    <div className={styles.container}>
      <Search />

      <CardList list={data?.data || []} />
    </div>
  );
}

export default HomeMain;
