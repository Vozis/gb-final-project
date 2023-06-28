import {
  ETypeConnect,
  IComment,
  ICommentPayload,
  IEventStatus,
  ILike,
} from '@project/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { comment } from 'postcss';
import { toggleCommentLike } from '../actions/likeActions';

export interface IInitialCommentState {
  isLoadingLike: boolean;
  allComments: IComment[];
  unreadComments: IComment[];
}

const initialState: IInitialCommentState = {
  isLoadingLike: false,
  allComments: [],
  unreadComments: [],
};

const findValue = (arr: IComment[], val: number): IComment | undefined => {
  for (let obj of arr) {
    if (obj.id === val) {
      return obj;
    }
    if (obj.children) {
      let result = findValue(obj.children, val);
      if (result) {
        return result;
      }
    }
  }
  return undefined;
};

function removeFromArrayOfObj(array: IComment[], idToRemove: number) {
  for (const [i, e] of array.entries()) {
    if (e.id === idToRemove) {
      array.splice(i, 1);
      continue;
    }
    if (e.children) {
      removeFromArrayOfObj(e.children, idToRemove);
    }
  }
  return array;
}

// function recursiveSearch(arr: IComment[], target: any): any {
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i].id === target.id) {
//       return arr[i];
//     }
//     if (arr[i].children) {
//       const result = recursiveSearch(arr[i].children, target);
//       if (result) {
//         return result;
//       }
//     }
//   }
//   return null;
// }

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    receiveAllComments: (
      state,
      action: PayloadAction<{
        allComments: IComment[];
      }>,
    ) => {
      // console.log(action.payload.allComments);
      state.allComments = action.payload.allComments;
    },
    receiveUnreadComments: (
      state,
      action: PayloadAction<{
        unreadComments: IComment[];
      }>,
    ) => {
      state.unreadComments = action.payload.unreadComments;
    },
    receiveComment: (
      state,
      action: PayloadAction<{
        comment: IComment;
      }>,
    ) => {
      // console.log(action.payload.comment);
      if (action.payload.comment.parentId) {
        const parent = findValue(
          state.allComments,
          action.payload.comment.parentId,
        );

        // console.log(parent);

        if (parent) {
          parent.children.unshift(action.payload.comment);
        }
      } else {
        state.allComments.unshift(action.payload.comment);
      }
    },
    submitComment: (
      state,
      action: PayloadAction<{
        message: string;
        eventId: number;
        parentId?: string;
        eventStatus?: IEventStatus;
        eventTime?: string;
      }>,
    ) => {
      return;
    },
    submitCommentDelete: (state, action: PayloadAction<{ id: number }>) => {
      return;
    },
    deleteComment: (state, action: PayloadAction<{ id: number }>) => {
      const newArray = removeFromArrayOfObj(
        state.allComments,
        action.payload.id,
      );
      state.allComments = newArray;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(toggleCommentLike.pending, state => {
        state.isLoadingLike = true;
      })
      .addCase(toggleCommentLike.rejected, state => {
        state.isLoadingLike = false;
        return state;
      })
      .addCase(toggleCommentLike.fulfilled, (state, action) => {
        let comment = findValue(state.allComments, action.payload.commentId);
        if (comment) {
          if (comment.isLiked) {
            console.log('isLiked');
            const newLikes = comment.likes.filter(
              like => like.commentId !== action.payload.commentId,
            );
            comment.likes = newLikes;
            comment.isLiked = false;
            comment._count.likes--;
          } else {
            comment.likes.push(action.payload);
            comment.isLiked = true;
            comment._count.likes++;
          }
        }
      });
  },
});
export const { reducer, actions } = commentSlice;
export default commentSlice;
