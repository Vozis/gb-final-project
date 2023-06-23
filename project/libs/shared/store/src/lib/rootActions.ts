import * as userActions from './actions/userActions';
import * as notificationActions from './actions/notificationActions';
import * as likeActions from './actions/likeActions';
import { actions as filterSliceActions } from './slices/filterSlice';
import { actions as CommentSliceActions } from './slices/commentSlice';
import { actions as socketActions } from './slices/socketSlice';

export const rootActions = {
  ...userActions,
  ...filterSliceActions,
  ...CommentSliceActions,
  ...notificationActions,
  ...likeActions,
  ...socketActions,
};
