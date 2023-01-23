import _ from 'lodash';
import {PostType} from '../types/Post';

export const sort = (array: PostType[], type: string) => {
  switch (type) {
    case 'popularity':
      return _.orderBy(
        array,
        [
          el =>
            el._count.Likes / (new Date().getTime() - Date.parse(el.createdAt)),
        ],
        ['desc'],
      );
    case 'date':
      return _.orderBy(array, [el => Date.parse(el.createdAt)], ['desc']);
    case 'likes':
      return _.orderBy(array, [el => el._count.Likes], ['desc']);
    default:
      return array;
  }
};
