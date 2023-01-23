import {PostType} from './Post';

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  EditPost: {post: PostType};
  AddPost: undefined;
};
