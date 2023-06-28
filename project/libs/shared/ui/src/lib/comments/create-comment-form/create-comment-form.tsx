import styles from './create-comment-form.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ICommentCreateForm, IEvent } from '@project/shared/types';
import { useActions } from '@project/shared/hooks';
import { Button, Field, MaterialIcon } from '@project/shared/ui';

/* eslint-disable-next-line */
export interface CreateCommentFormProps {
  parentId?: string;
  event: IEvent;
}

export function CreateCommentForm({ parentId, event }: CreateCommentFormProps) {
  const { submitComment } = useActions();

  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
    setValue,
  } = useForm<ICommentCreateForm>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ICommentCreateForm> = async data => {
    submitComment({
      message: data.message,
      eventId: event.id,
      eventTime: event.eventTime,
      eventStatus: event.status,
      parentId,
    });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={'flex justify-center items-center'}
    >
      <Field
        {...register('message', {
          required: 'Пустой комментарий не приветствуется :)',
        })}
        placeholder={'Ваш комментарий...'}
        error={errors.message}
        type={'text'}
      />
      <Button type={'submit'}>
        <MaterialIcon name={'MdSend'} className={'text-3xl'} />
      </Button>
    </form>
  );
}

export default CreateCommentForm;
