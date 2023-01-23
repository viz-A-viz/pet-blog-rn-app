import {createAsyncThunk} from '@reduxjs/toolkit';
import $api from '../../http/index';
import type {PostType} from '../../types/Post';

export const fetchPosts = createAsyncThunk('posts/fetchAll', async () => {
  const response = await $api.get<PostType[]>('/posts');
  return response.data;
});

export const editPost = createAsyncThunk(
  'posts/editPost',
  async (data: {titleEdit: string; textEdit: string; idEdit: number}) => {
    const response = await $api.put<string>('/posts', data);
    return response.data;
  },
);

export const addPost = createAsyncThunk(
  'posts/add',
  async (data: {title: string; text: string}) => {
    const response = await $api.post<PostType>('/posts', data);
    return response.data;
  },
);

export const deletePost = createAsyncThunk(
  'posts/delete',
  async (id: number) => {
    const response = await $api.delete<PostType>('/posts', {
      data: {id},
    });
    return response.data;
  },
);

export const likePost = createAsyncThunk(
  'posts/like',
  async (userLike: {postId: number; userId: number}) => {
    await $api.post<string>('/likes', userLike);
  },
);

export const unlikePost = createAsyncThunk(
  'posts/unlike',
  async (userLike: {postId: number; userId: number}) => {
    await $api.delete<string>('/likes', {
      data: {...userLike},
    });
  },
);
