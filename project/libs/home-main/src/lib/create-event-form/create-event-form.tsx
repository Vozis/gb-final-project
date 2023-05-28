import styles from './create-event-form.module.scss';
import { Button } from '@project/shared/ui';
import Field from '../../../../shared/ui/src/lib/form/input/input';
import { Controller, useForm } from 'react-hook-form';
import SelectField from '../../../../shared/ui/src/lib/form/select/select';

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

      <Button className={styles.formBtn} type={'submit'}>
        Создать
      </Button>
    </form>
  );
}

export default CreateEventForm;
