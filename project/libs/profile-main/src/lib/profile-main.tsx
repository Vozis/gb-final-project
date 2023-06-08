import { SubmitHandler, useForm } from 'react-hook-form';
import ProfileForm from './profile-form/profile-form';
import ProfileHead from './profile-head/profile-head';
import styles from './profile-main.module.scss';

import axios from 'axios';
import { IEvent, IUserEdit } from '@project/shared/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Tabs, TabsProps } from '@project/shared/ui';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { errorCatch } from '@project/shared/utils';

/* eslint-disable-next-line */

export interface ProfileMainProps {
  tabs?: TabsProps;
}

const tabs = [
  { id: '1', label: 'Мои события' },
  { id: '2', label: 'Участвую' },
];

export function ProfileMain(props: ProfileMainProps) {
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);
  // const [user, setUser] = useState<User>({});
  //
  // useEffect(() => {
  //   const localUser = localStorage.getItem('user');
  //   if (localUser) {
  //     setUser(JSON.parse(localUser));
  //   }
  // }, []);
  const handleTabClick = (id: string) => {
    setSelectedTabId(id);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<IUserEdit>({
    mode: 'onChange',
  });

  // const { isLoading: isLoadingTags, data: times } = useQuery(
  //   ['get-tags-count'],
  //   () => axios.get<ITag[]>('/api/tags/by-type/count'),
  //   {
  //     select: ({ data: times }) =>
  //       times.map(
  //         (time): IOption => ({
  //           label: time.name,
  //           value: time.id,
  //         }),
  //       ),
  //     onError: err => {
  //       toast.error(errorCatch(err));
  //     },
  //   },
  // );

  const { mutateAsync } = useMutation(['update-user'], data =>
    axios.put('/api/users/profile', data),
  );

  const onSubmit: SubmitHandler<IUserEdit> = async data => {
    const formData = new FormData();

    // try {
    //   console.log(data);
    //   const res = await axios.post('/api/auth/login', data);
    //   console.log(res.data);
    //   localStorage.setItem('user', JSON.stringify(res.data));
    //   toast.success('Login Success');
    // } catch (err) {
    //   toast.error(errorCatch(err));
    // }
  };

  return (
    <div className={styles['container']}>
      {/* <h1>Welcome to ProfileHobbies!</h1> */}
      <ProfileHead />
      {/*<ProfileForm />*/}
      <Tabs tabs={tabs} onClick={handleTabClick} selectedId={selectedTabId} />
      <div className="TabsPage-Content">
        {selectedTabId === tabs[0].id && <div>Созданные карточки</div>}
        {selectedTabId === tabs[1].id && (
          <div>Список событий в которых участвует</div>
        )}
      </div>
    </div>
  );
}

export default ProfileMain;
