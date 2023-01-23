import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { CommentType } from '../../types/Comment';
import {
  addComment,
  deleteComment,
  fetchComments,
} from '../actionCreators/commentsActions';

interface CommentsState {
  comments: CommentType[];
}

const initialState: CommentsState = {
  comments: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      _.remove(state.comments, (comment) => comment.id === action.payload.id);
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      const { index } = action.payload;
      if (index >= 0) state.comments.splice(index + 1, 0, action.payload);
      else state.comments.push(action.payload);
    });
  },
});

export default commentsSlice.reducer;
