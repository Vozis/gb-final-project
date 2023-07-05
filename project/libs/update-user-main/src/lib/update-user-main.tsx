import styles from './update-user-main.module.scss';
import UpdateUserForm from './update-user-form/update-user-form';

/* eslint-disable-next-line */
export interface UpdateUserMainProps {}

export function UpdateUserMain(props: UpdateUserMainProps) {
  return (
    <div className={styles['container']}>
      <UpdateUserForm />
    </div>
  );
}

export default UpdateUserMain;
