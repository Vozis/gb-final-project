import styles from './create-event.module.scss';
import { CreateEventMain } from '@project/create-event-main';

/* eslint-disable-next-line */
export interface CreateEventProps {}

export function CreateEvent(props: CreateEventProps) {
  return <CreateEventMain />;
}

export default CreateEvent;
