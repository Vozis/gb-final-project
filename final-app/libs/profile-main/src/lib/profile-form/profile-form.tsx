import cn from 'clsx';
import { useState } from 'react';
import ProfileHobbies from '../profile-hobbies/profile-hobbies';
import ProfileSettings from '../profile-settings/profile-settings';
import styles from './profile-form.module.scss';

/* eslint-disable-next-line */
export interface ProfileFormProps {}

export function ProfileForm(props: ProfileFormProps) {
  const [activeForm, setActiveForm] = useState<string>('profileHobbies');

  return (
    <div className={styles['container']}>
      <div className={styles.container_btn}>
        <button
          className={cn('text-black', {
            ['text-[#1F3EE3] border-b border-[#1F3EE3]']:
              activeForm === 'profileHobbies',
          })}
          onClick={() => setActiveForm('profileHobbies')}
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
      {activeForm === 'profileHobbies' ? (
        <ProfileHobbies />
      ) : (
        <ProfileSettings />
      )}
    </div>
  );
}

export default ProfileForm;
