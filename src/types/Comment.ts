export type CommentType = {
  id: number;
  text: string;
  postId: number;
  parentId: number | null;
  userId: number;
  width: number;
  createdAt: string;
  _count: {Likes: number};
  user: {firstName: string; lastName: string};
};
