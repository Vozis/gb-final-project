import moment from 'moment';
import { useAuthRedux } from '@project/shared/hooks';
import { IEventUser, IUser } from '@project/shared/types';
import { d } from '@pmmmwh/react-refresh-webpack-plugin/types/options';

const checkDateStatus = (currentDate: Date, eventDate: Date) => {
  return currentDate > eventDate;
};

export const useCheckEventStatus = () => {
  const currentDate = new Date();

  const { user } = useAuthRedux();

  if (!user) return {};

  const finishedEvents = user.events.map(event => {
    const eventDate = new Date(event.eventTime);

    const isFinished = checkDateStatus(currentDate, eventDate);

    if (isFinished) {
      return {
        id: event.id,
        isFinished: isFinished,
      };
    }
    return null;
  });

  return { finishedEvents };
};
