import * as userActions from './actions/userActions';
import * as notificationActions from './actions/notificationActions';
import { actions as filterSliceActions } from './slices/filterSlice';
import { actions as CommentSliceActions } from './slices/commentSlice';

export const rootActions = {
  ...userActions,
  ...filterSliceActions,
  ...CommentSliceActions,
  ...notificationActions,
};
