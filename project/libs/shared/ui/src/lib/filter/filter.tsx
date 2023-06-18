import styles from './filter.module.scss';
import { SearchField } from '../form/search-input/search-input';
import { RadioField } from '../form/radio/radio';
import {
  Controller,
  FormState,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';
import { SelectField } from '../form/select/select';
import { Button } from '../button/button';
import { IOption, ISearchForm, ITag } from '@project/shared/types';
import { FC, useState } from 'react';
import { MaterialIcon } from '../icons/material-icon';
import { useAuthRedux } from '@project/shared/hooks';
import { useQuery } from '@tanstack/react-query';
import { TagService } from '@project/shared/services';
import { toast } from 'react-toastify';
import { errorCatch } from '@project/shared/utils';

/* eslint-disable-next-line */
export interface FilterProps {
  // register: UseFormRegister<any>;
  // formState: FormState<any>;
  // handleSubmit: SubmitHandler<ISearch>;
  onSubmit: SubmitHandler<ISearchForm>;
}

export const Filter: FC<FilterProps> = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user } = useAuthRedux();
  let userSportHobbies: string[] | number[] = [];

  const {
    formState: { errors },
    handleSubmit,
    register,
    control,
    setValue,
    trigger,
    reset,
  } = useForm<ISearchForm>({
    mode: 'onChange',
  });
  //
  // if (user && user.hobbies) {
  //   userSportHobbies = user.hobbies
  //     .filter((hobby: ITag) => hobby.type.name === 'sport')
  //     .map(item => item.id);
  //
  //   console.log('userHobbies: ', userSportHobbies);
  //   // setValue('tags', userSportHobbies);
  // }

  const { data: sports, isLoading: isSportsLoading } = useQuery(
    ['get-sport-tags'],
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={'flex flex-col gap-4 items-start mb-5'}
    >
      <div className={'flex gap-4 items-center w-full'}>
        <SearchField
          {...register('valuesSearch')}
          placeholder={'Просто начните писать...'}
          // onChange={debounce(async () => {
          //   await trigger('valuesSearch');
          // }, 500)}
        />
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={
            'rounded-lg text-black text-3xl transition-all ease-in-out duration-200 hover:border hover:border-black'
          }
        >
          <MaterialIcon name={'MdFilterList'} />
        </Button>
      </div>
      {isOpen && (
        <>
          <div className={'flex gap-4'}>
            <RadioField
              value={'name'}
              label={'По названию'}
              {...register('paramsSearch')}
              defaultChecked={true}
            />
            <RadioField
              value={'description'}
              label={'По описанию'}
              {...register('paramsSearch')}
            />
          </div>
          <Controller
            name={'tags'}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <SelectField
                options={sports || []}
                field={field}
                placeholder={'Тип спорта'}
                isMulti={true}
                isLoading={isSportsLoading}
                error={error}
              />
            )}
          />
        </>
      )}
      <Button
        type={'submit'}
        className={'px-6 bg-[#04145C] rounded-xl text-white'}
      >
        Искать
      </Button>
    </form>
  );
};

export default Filter;
