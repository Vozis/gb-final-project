import { IToggle } from '@project/shared/types';

export const AuthApi = {
  register: `auth/register`,
  login: `auth/login`,
  getNewTokens: `auth/get-new-tokens`,
};

export const EventApi = {
  getAllNoUser: `/events/no-user/all`,
  getAll: `/events/all`,
  createEvent: `/events`,
  getByUserHobbies: `/events/by-user-hobbies`,
  toggleUser(id: number) {
    return `events/${String(id)}/toggle-user`;
  },
  getByIdNoUser(id: string) {
    return `events/no-user/${id}`;
  },
  getById(id: string) {
    return `events/${id}`;
  },
};

export const TagApi = {
  getByType(type: string) {
    return `/tags/by-type/${type}`;
  },
};

export const UserApi = {
  getProfile: '/users/profile',
  updateProfile: '/users/profile',
  toggle: 'users/profile/toggle',
  resetPassword: 'users/profile/reset-password',
  getById(id: string) {
    return `/users/${id}`;
  },
};

export const MailApi = {
  confirmEmail: 'mail/confirm',
  resendConfirmationLink: 'mail/resend-confirmation-link',
  sendResetPasswordLink: 'mail/send-reset',
  checkResetPasswordLink: 'mail/check-reset-password',
};

export const TypeApi = {};
