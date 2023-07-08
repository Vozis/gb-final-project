import { errorCatch } from '@project/shared/utils';
import { toast } from 'react-hot-toast';
// import { toast } from 'react-toastify';

const toastError = (error: any, title?: string) => {
  const message = errorCatch(error);
  // toast.error(message, {
  //   toastId: message,
  // });
  toast.error(message, {
    id: message,
  });

  throw message;
};

export default toastError;
