import { SubmitHandler, useForm } from 'react-hook-form';
import ProfileHead from './profile-head/profile-head';
import styles from './profile-main.module.scss';

import axios from 'axios';
import { IUserEdit } from '@project/shared/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Tabs, TabsProps } from '@project/shared/ui';
import React, { useEffect, useState } from 'react';

/* eslint-disable-next-line */

export interface ProfileMainProps {
  tabs?: TabsProps;
}

const tabs = [
  {
    id: '1',
    label: 'Мои события',
    content: 'content tab 1',
  },
  { id: '2', label: 'Участвую', content: 'content tab 2' },
];

export function ProfileMain(props: ProfileMainProps) {
  // const [user, setUser] = useState<User>({});
  //
  // useEffect(() => {
  //   const localUser = localStorage.getItem('user');
  //   if (localUser) {
  //     setUser(JSON.parse(localUser));
  //   }
  // }, []);

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
      <ProfileHead />
      {/*<ProfileForm />*/}
      <Tabs tabs={tabs} />
    </div>
  );
}

export default ProfileMain;
