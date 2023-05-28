import { IUserEdit } from '@project/shared/types';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import styles from './profile-main.module.scss';

/* eslint-disable-next-line */
export interface ProfileMainProps {}

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

    console.log(data);

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
    <form className={styles['register_form']} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="p-2">
          <label htmlFor="">Бадминтон</label>
          <input
            type="checkbox"
            value="Badminton"
            placeholder="Badminton"
            {...register('times', { required: true })} // не понял почему times, должно быть role причем массив
            className="mx-3" // сделать через силект
          />
        </div>
        <div className="p-2">
          <label htmlFor="">Футбол</label>
          <input
            type="checkbox"
            value="football"
            placeholder="football"
            {...register('times', { required: true })}
            className="mx-3"
          />
        </div>
      </div>
      <div>
        <Controller
          name={'times'}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <SelectField
              options={times || []}
              field={field}
              placeholder={'Выбери подходящее время'}
              isMulti={true}
              isLoading={isLoadingTags}
              error={error}
            />
          )}
        />
      </div>

    // <form className={styles['register_form']} onSubmit={handleSubmit(onSubmit)}>
    //   <div>
    //     <Controller
    //       name={'times'}
    //       control={control}
    //       render={({ field, fieldState: { error } }) => (
    //         <SelectField
    //           options={times || []}
    //           field={field}
    //           placeholder={'Выбери подходящее время'}
    //           isMulti={true}
    //           isLoading={isLoadingTags}
    //           error={error}
    //         />
    //       )}
    //     />
    //   </div>
    //
    //   <Button type={'submit'}>Изменить</Button>
    // </form>
  );
}

export default ProfileMain;
