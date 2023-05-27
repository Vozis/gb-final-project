import cn from 'clsx';
import { useState } from 'react';
import ProfileMain from '../profile-main';
import ProfileSettings from '../profile-settings/profile-settings';
import styles from './profile-form.module.scss';

/* eslint-disable-next-line */
export interface ProfileFormProps {}

export function ProfileForm(props: ProfileFormProps) {
  const [activeForm, setActiveForm] = useState<string>('profileMain');

  return (
    <div className={styles['container']}>
      <div className={styles.container_btn}>
        <button
          className={cn('text-black', {
            ['text-[#1F3EE3] border-b border-[#1F3EE3]']:
              activeForm === 'profileMain',
          })}
          onClick={() => setActiveForm('profileMain')}
        >
          Увлечения
        </button>
        <button
          className={cn('text-black', {
            ['text-[#1F3EE3] border-b border-[#1F3EE3]']:
              activeForm === 'profileSettings',
          })}
          onClick={() => setActiveForm('profileSettings')}
        >
          Настройки
        </button>
      </div>
      {activeForm === 'profileMain' ? <ProfileMain /> : <ProfileSettings />}
    </div>
  );
}

export default ProfileForm;
