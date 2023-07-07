import { IEvent } from '@project/shared/types';

export const checkCardFull = (dto: Pick<IEvent, 'users' | 'tags'>) => {
  const userCount = dto.users.length - 1;
  // const maxCount = dto.tags.find(item => item.type === 'count')
  const maxCount = 2;
};
