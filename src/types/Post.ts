import { PostLikesType } from './PostLikesType';
import { PostUsersType } from './PostUsersType';

export type PostType = {
  id: number;
  title: string;
  text: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  Users: PostUsersType;
  _count: { Likes: number };
  Likes: PostLikesType;
};
