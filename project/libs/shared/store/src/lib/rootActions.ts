import * as userActions from './actions/userActions';
import * as asyncNotificationActions from './actions/notificationActions';
import * as likeActions from './actions/likeActions';
import { actions as filterSliceActions } from './slices/filterSlice';
import { actions as CommentSliceActions } from './slices/commentSlice';
import { actions as socketActions } from './slices/socketSlice';
import { actions as notificationActions } from './slices/notificationSlice';

export const rootActions = {
  ...userActions,
  ...filterSliceActions,
  ...CommentSliceActions,
  ...notificationActions,
  ...asyncNotificationActions,
  ...likeActions,
  ...socketActions,
};
