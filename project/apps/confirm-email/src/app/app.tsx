// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { Link, redirect } from 'react-router-dom';

import { useActions, useAuthRedux } from '@project/shared/hooks';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { useMutation, useQuery } from '@tanstack/react-query';
import { MailService } from '@project/shared/services';
import { errorCatch } from '@project/shared/utils';
import { AxiosError } from 'axios';

export function App() {
  const navigate = useNavigate();
  const { user } = useAuthRedux();

  if (!user) navigate('/auth');

  let [searchParams] = useSearchParams();

  const { getProfile } = useActions();

  const { mutate } = useMutation(['resend-confirmation-link'], () =>
    MailService.resendConfirmationLink(),
  );

  const { isLoading, data, error } = useQuery(
    ['confirm-email', searchParams],
    () => MailService.confirmEmail({ token: searchParams.get('token') || '' }),
    {
      select: data => ({ data }),
      onSuccess: () => {
        getProfile();
      },
      onError: (err: AxiosError<{ message: string }>) => {
        const error = errorCatch(err);
        if (error === 'Email confirmation token expired') mutate();
        else if (error === 'Email already confirmed') navigate('/');

        return err;
      },
      retry: false,
    },
  );

  // console.log('data: ', data);
  // console.log('error: ', error);

  return (
    <div>
      {!user?.isConfirmed &&
        error?.response?.data?.message ===
          'Email confirmation token expired' && (
          <p>Проверьте почту, вам отправлена новая ссылка</p>
        )}
      {user?.isConfirmed && (
        <>
          <h1>Email успешно подтвержден :)</h1>
          <Link to="/" className={'border-black border'}>
            Перейти на главную
          </Link>
        </>
      )}
    </div>
  );
}

export default App;
