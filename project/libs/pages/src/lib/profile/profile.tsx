import styles from './profile.module.scss';
import { ProfileMain } from '@project/profile-main';

/* eslint-disable-next-line */
export interface ProfileProps {}

export function Profile(props: ProfileProps) {
  return <ProfileMain />;
}

export default Profile;
