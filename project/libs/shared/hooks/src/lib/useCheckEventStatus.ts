import { useAuthRedux } from '@project/shared/hooks';

const checkDateStatus = (currentDate: Date, eventDate: Date) => {
  return currentDate > eventDate;
};

export const useCheckEventStatus = () => {
  const currentDate = new Date();

  const { user } = useAuthRedux();

  if (!user) return {};

  const finishedEvents = user.events
    .filter(event => {
      const eventDate = new Date(event.eventTime);

      const isFinished = checkDateStatus(currentDate, eventDate);

      if (isFinished) {
        return event;
      }
    })
    .map(event => ({
      id: event.id,
    }));

  return { finishedEvents };
};
