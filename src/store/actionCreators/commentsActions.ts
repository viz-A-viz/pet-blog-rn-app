import {createAsyncThunk} from '@reduxjs/toolkit';
import $api from '../../http/index';
import {CommentType} from '../../types/Comment';

export const fetchComments = createAsyncThunk(
  'comments/fetchAll',
  async (id: number) => {
    const response = await $api.get<CommentType[]>('/comments', {
      params: {id},
    });
    return response.data;
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  async (data: {
    parentId?: number;
    postId: number;
    text: string;
    width: number;
    index: number;
  }) => {
    const {parentId, postId, text, width, index} = data;
    const response = await $api.post<CommentType>('/comments', {
      parentId,
      postId,
      text,
    });
    return {...response.data, width: width - 10, index};
  },
);

export const deleteComment = createAsyncThunk(
  'comment/delete',
  async (id: number) => {
    const response = await $api.delete<CommentType>('/comments', {
      data: {id},
    });
    return response.data;
  },
);

export const likeComment = createAsyncThunk(
  'comments/like',
  async (userLike: {commentId: number; userId: number}) => {
    await $api.post<string>('/likes', userLike);
  },
);

export const unlikeComment = createAsyncThunk(
  'comments/unlike',
  async (userLike: {commentId: number; userId: number}) => {
    await $api.delete<string>('/likes', {
      data: {...userLike},
    });
  },
);
