import styles from './create-event-form.module.scss';
import { Button, Field } from '@project/shared/ui';

import { Controller, useForm } from 'react-hook-form';

/* eslint-disable-next-line */
export interface CreateEventFormProps {}

export function CreateEventForm(props: CreateEventFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          placeholder={'Название'}
          {...register('name', { required: true })}
        />
        <Field
          placeholder={'Описание'}
          {...register('description', { required: true })}
        />
        {/*<Controller*/}
        {/*        name={'times'}*/}
        {/*        control={control}*/}
        {/*        render={({ field, fieldState: { error } }) => (*/}
        {/*          <SelectField*/}
        {/*            options={times || []}*/}
        {/*            field={field}*/}
        {/*            placeholder={'Выбери подходящее время'}*/}
        {/*            isMulti={true}*/}
        {/*            isLoading={isLoadingTags}*/}
        {/*            error={error}*/}
        {/*          />*/}
        {/*        )}*/}
        {/*/>*/}

        <Button type={'submit'}>Создать</Button>
      </form>
    </div>
  );
}

export default CreateEventForm;
