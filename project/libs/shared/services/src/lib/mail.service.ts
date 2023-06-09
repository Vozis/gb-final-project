import { axiosAuth, axiosClassic, MailApi } from '@project/shared/config';
import { errorCatch } from '@project/shared/utils';

export const MailService = {
  async confirmEmail(data: { token: string }) {
    return axiosClassic.post(MailApi.confirmEmail, data);
  },

  async resendConfirmationLink() {
    return axiosAuth.post(MailApi.resendConfirmationLink);
  },
};
