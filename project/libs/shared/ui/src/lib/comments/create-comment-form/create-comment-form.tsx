import styles from './create-comment-form.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ICommentCreateForm } from '@project/shared/types';
import { useActions } from '@project/shared/hooks';
import { Button, Field, MaterialIcon } from '@project/shared/ui';

/* eslint-disable-next-line */
export interface CreateCommentFormProps {
  parentId?: string;
  eventId: string;
}

export function CreateCommentForm({
  parentId,
  eventId,
}: CreateCommentFormProps) {
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
    submitComment({ message: data.message, eventId, parentId });
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
