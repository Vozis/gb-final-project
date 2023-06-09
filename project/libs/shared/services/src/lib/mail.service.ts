import { axiosAuth, axiosClassic, MailApi } from '@project/shared/config';

export const MailService = {
  async confirmEmail(data: { token: string }) {
    return axiosClassic.post(MailApi.confirmEmail, data);
  },

  async resendConfirmationLink() {
    return axiosAuth.post(MailApi.resendConfirmationLink);
  },

  async sendResetPasswordLink(data: { email: string }) {
    return axiosClassic.post(MailApi.sendResetPasswordLink, data);
  },

  async checkResetPasswordToken(data: { token: string }) {
    return axiosClassic.post<{ email: string; id: number }>(
      MailApi.checkResetPasswordLink,
      data,
    );
  },
};
