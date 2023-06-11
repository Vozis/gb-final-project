// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import { SharedLayout } from '@project/shared/layout';
import { SharedProviders } from '@project/shared/providers';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { MailService, UserService } from '@project/shared/services';
import { IResetPassword, IResetPasswordForm } from '@project/shared/types';
import { Button, Field } from '@project/shared/ui';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { errorCatch } from '@project/shared/utils';
import { toast } from 'react-toastify';
import { data } from 'autoprefixer';

export function App() {
  let [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IResetPasswordForm>({
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const { mutateAsync } = useMutation(
    ['reset-password'],
    (data: IResetPassword) => UserService.resetPassword(data),
  );

  const {
    data: tokenPayload,
    isSuccess,
    isError,
    error,
  } = useQuery(
    ['confirm-email', searchParams],
    () =>
      MailService.checkResetPasswordToken({
        token: searchParams.get('token') || '',
      }),
    {
      select: ({ data }) => data,
      onError: (err: AxiosError<{ message: string }>) => {
        const error = errorCatch(err);
        if (error === 'Email confirmation token expired') {
          toast.error(
            'Ссылка устарела, необходимо выполнить восстановление пароля заново',
            {
              toastId: 'link-reset-error',
              containerId: 1,
            },
          );
          navigate('/auth');
        }
      },
      retry: false,
    },
  );

  if (!tokenPayload) return null;

  const onSubmit: SubmitHandler<IResetPasswordForm> = async data => {
    const entries: IResetPassword = {
      id: tokenPayload?.id || 1,
      data: {
        password: data.password,
      },
    };

    await mutateAsync(entries);
    navigate('/auth');
  };

  // const { mutateAsync: mutateSendLink } = useMutation(
  //   ['send-reset-password'],
  //   (data: { email: string }) => MailService.sendResetPasswordLink(data),
  //   {
  //     onSuccess: () => {
  //       toast.success(
  //         'На указанный email отправлено сообщение для восстановления пароля',
  //         {
  //           toastId: 'send-reset-password-link',
  //           containerId: 1,
  //         },
  //       );
  //       navigate('/');
  //     },
  //   },
  // );

  return (
    <SharedProviders>
      <SharedLayout>
        {isSuccess && (
          <form
            className={styles['register_form']}
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className={styles.register_title}>Войдите, чтобы продолжить</p>

            <Field
              {...register('password', { required: 'Без ввода пароля никак' })}
              placeholder={'Ваш пароль...'}
              error={errors.password}
              type={'password'}
              visibility
            />
            <Field
              {...register('confirmPassword', {
                required: 'Без ввода пароля никак',
                validate: (value: string) => {
                  if (watch('password') !== value)
                    return 'Пароли должны совпадать';
                },
              })}
              placeholder={'Подтвердите пароль...'}
              error={errors.confirmPassword}
              type={'password'}
              visibility
            />
            <Button type={'submit'} className={styles.register_form_btn}>
              Отправить
            </Button>
          </form>
        )}
        {/*{isError && (*/}
        {/*  <div>*/}
        {/*    <p>*/}
        {/*      Ссылка устарела, кликните на кнопку ниже для отправки нового*/}
        {/*      сообщения*/}
        {/*    </p>*/}
        {/*    <Button*/}
        {/*      onClick={() => mutateSendLink({ email: tokenPayload.email })}*/}
        {/*    >*/}
        {/*      Отправить ссылку*/}
        {/*    </Button>*/}
        {/*  </div>*/}
        {/*)}*/}
      </SharedLayout>
    </SharedProviders>
  );
}

export default App;
