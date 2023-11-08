import { UserSelect } from '../user/returnUserObject';

export interface ReturnAuth {
  user: UserSelect;
  accessToken: string;
  refreshToken: string;
}
