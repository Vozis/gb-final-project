import { createAsyncThunk } from '@reduxjs/toolkit';
import { IEvent } from '@project/shared/types';
import { toast } from 'react-toastify';
import { errorCatch } from '@project/shared/utils';
import { NotificationService } from '@project/shared/services';

export const getFinishedEvents = createAsyncThunk<IEvent[]>(
  'notification/get-finished-events',
  async (_, thunkAPI) => {
    try {
      const response = await NotificationService.getFinishedEvents();
      toast.success('Получены данные о завершенных событиях', {
        toastId: 'get-finished-events',
        containerId: 1,
      });
      return response.data;
    } catch (err) {
      toast.error(errorCatch(err));
      return thunkAPI.rejectWithValue(err);
    }
  },
);
