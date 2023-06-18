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
import { IOption, ISearchForm } from '@project/shared/types';
import { FC, useState } from 'react';
import { MaterialIcon } from '../icons/material-icon';

/* eslint-disable-next-line */
export interface FilterProps {
  // register: UseFormRegister<any>;
  // formState: FormState<any>;
  // handleSubmit: SubmitHandler<ISearch>;
  onSubmit: SubmitHandler<ISearchForm>;
}

const options: IOption[] = [
  { value: 1, label: 'Более 5 человек' },
  { value: 2, label: 'До 5 человек' },
];

export const Filter: FC<FilterProps> = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
                options={options || []}
                field={field}
                placeholder={'Тип спорта'}
                isMulti={true}
                // isLoading={isLoading}
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
