import styles from './form-reset.module.scss';
import { Button, Field } from '@project/shared/ui';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { MailService } from '@project/shared/services';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
// import { toast } from 'react-toastify';

/* eslint-disable-next-line */
export interface FormResetProps {}

export function FormReset(props: FormResetProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const navigate = useNavigate();

  const { mutateAsync } = useMutation(
    ['send-reset-password'],
    (data: { email: string }) => MailService.sendResetPasswordLink(data),
    {
      onSuccess: () => {
        // toast.success(
        //   'На указанный email отправлено сообщение для восстановления пароля',
        //   {
        //     toastId: 'send-reset-password-link',
        //     containerId: 1,
        //   },
        // );
        toast.success(
          'На указанный email отправлено сообщение для восстановления пароля',
          {
            id: 'send-reset-password-link',
          },
        );
        navigate('/');
      },
    },
  );

  const onSubmit: SubmitHandler<{ email: string }> = async data => {
    await mutateAsync(data);
  };

  return (
    <form className={styles['register_form']} onSubmit={handleSubmit(onSubmit)}>
      <p className={styles.register_title}>Войдите, чтобы продолжить</p>

      <Field
        {...register('email', { required: 'Без email никак' })}
        placeholder={'Ваш email...'}
        error={errors.email}
      />

      <Button type={'submit'} className={styles.register_form_btn}>
        Восстановить пароль
      </Button>
    </form>
  );
}

export default FormReset;
