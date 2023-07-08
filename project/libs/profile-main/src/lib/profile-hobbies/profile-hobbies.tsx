import { TagService } from '@project/shared/services';
import { IOption, ITag, IUserEdit } from '@project/shared/types';
import { Button, SelectField } from '@project/shared/ui';
import { errorCatch } from '@project/shared/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
import { toast } from 'react-hot-toast';
import styles from './profile-hobbies.module.scss';

/* eslint-disable-next-line */
export interface ProfileHobbiesProps {}

export function ProfileHobbies(props: ProfileHobbiesProps) {
  const [isClearable, setIsClearable] = useState(true); //для чецбокса
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

  const { isLoading: isLoadingTags, data: times } = useQuery(
    ['get-tags-count'],
    () => axios.get<ITag[]>('/api/tags/by-type/count'),
    {
      select: ({ data: times }) =>
        times.map(
          (time): IOption => ({
            label: time.name,
            value: time.id,
          }),
        ),
      onError: err => {
        toast.error(errorCatch(err));
      },
    },
  );

  const { data: sportKinds, isLoading } = useQuery(
    ['get-hobbies'],
    () => TagService.getByType('sport'),
    {
      select: ({ data }) =>
        data.map(
          (item): IOption => ({
            label: item.name,
            value: item.id,
          }),
        ),
      onError: err => {
        toast.error(errorCatch(err));
      },
    },
  );

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
    // <div> Hello profile-hobbies</div>
    <form className={styles['register_form']} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Controller
          name={'hobbies'}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <SelectField
              options={sportKinds || []}
              field={field}
              placeholder={'Выбери свои хобби...'}
              isMulti={true}
              isLoading={isLoading}
              error={error}
            />
          )}
        />
        <Controller
          name={'favorites'}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <SelectField
              options={times || []}
              field={field}
              placeholder={'Выбери колличество участников...'}
              isMulti={true}
              isLoading={isLoadingTags}
              error={error}
            />
          )}
        />
      </div>
      <Button type={'submit'}>Продолжить</Button>
    </form>
  );
}

export default ProfileHobbies;
