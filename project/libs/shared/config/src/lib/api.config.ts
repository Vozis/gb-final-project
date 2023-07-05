import { IToggle } from '@project/shared/types';

export const AuthApi = {
  register: `auth/register`,
  login: `auth/login`,
  getNewTokens: `auth/get-new-tokens`,
};

export const EventApi = {
  getAllNoUser: `/events/public/all`,
  getAll: `/events/all`,
  createEvent: `/events`,
  getByUserHobbies: `/events/by-user-hobbies`,
  toggleUser(id: number) {
    return `events/${String(id)}/toggle-user`;
  },
  getByIdNoUser(id: string) {
    return `events/public/${id}`;
  },
  getById(id: string) {
    return `events/${id}`;
  },
  getFinishedEvents: 'events/finished',
  updateEvent(id: string) {
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
  getByIdNoUser(userId: string) {
    return `/users/public/${userId}`;
  },
  getById(userId: string) {
    return `/users/${userId}`;
  },
  getAll: 'users/all',
};

export const MailApi = {
  confirmEmail: 'mail/confirm',
  resendConfirmationLink: 'mail/resend-confirmation-link',
  sendResetPasswordLink: 'mail/send-reset',
  checkResetPasswordLink: 'mail/check-reset-password',
};

export const TypeApi = {};
