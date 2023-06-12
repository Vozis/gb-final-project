import { useAuthRedux } from '@project/shared/hooks';
import { EventService } from '@project/shared/services';
import { ISearch, IUserEdit } from '@project/shared/types';
import { Tabs, TabsProps } from '@project/shared/ui';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ProfileHead from './profile-head/profile-head';
import styles from './profile-main.module.scss';

/* eslint-disable-next-line */

export interface ProfileMainProps {
  tabs?: TabsProps;
}

export function ProfileMain(props: ProfileMainProps) {
  const { user } = useAuthRedux();
  const navigate = useNavigate();
  const {
    isLoading,
    data: profileEvents,
    isError,
    error,
  } = useQuery(['get-profile-events'], () =>
    EventService.getAllEvents(filterProfileParamsArray),
  );
  const { mutateAsync } = useMutation(['update-user'], data =>
    axios.put('/api/users/profile', data),
  );
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

  if (!user) {
    navigate('/auth');
    return null;
  }

  const filterProfileParamsArray: ISearch = {
    filterNestedFieldsParams: [
      {
        paramsCategory: 'users',
        paramsType: 'id',
        nestedFieldValue: user.id,
      },
    ],
    filterEventFieldsParams: [
      {
        paramsFilter: 'creator',
        eventFieldValue: user.id,
      },
    ],
  };

  if (!profileEvents) return null;

  const data = profileEvents.data;
  const myEvents = () => {
    const myArr = data.filter(event => event.creator?.id === user.id);
    if (!myArr.length) return null;
    return myArr;
  };

  console.log('myEvents ', myEvents());

  const participationArr = data.filter(event =>
    event.users?.some(item => item.id === user.id),
  );

  console.log('part: ', participationArr);

  const tabs = [
    {
      id: '1',
      label: 'Мои события',
      content: myEvents(),
    },
    {
      id: '2',
      label: 'Участвую',
      content: participationArr,
    },
  ];

  // console.log(profileEvents.data);

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
      <Tabs tabs={tabs} />
    </div>
  );
}

export default ProfileMain;
