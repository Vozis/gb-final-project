import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILike } from '@project/shared/types';
import { LikeService } from '@project/shared/services';
import { toast } from 'react-hot-toast';
// import { toast } from 'react-toastify';
import { errorCatch } from '@project/shared/utils';

export const toggleCommentLike = createAsyncThunk<ILike, { commentId: number }>(
  'like/toggle-like',
  async (data, thunkAPI) => {
    try {
      const response = await LikeService.toggleCommentLike(data);
      // toast.success('Состояние лайка изменено', {
      //   toastId: 'like-comment-toggle',
      //   containerId: 1,
      // });
      // toast.success('Состояние лайка изменено', {
      //   id: 'like-comment-toggle',
      // });

      return response.data;
    } catch (err) {
      toast.error(errorCatch(err), {
        id: 'like-comment-toggle',
      });
      return thunkAPI.rejectWithValue(err);
    }
  },
);
