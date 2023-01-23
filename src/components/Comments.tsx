import React from 'react';
import {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {fetchComments} from '../store/actionCreators/commentsActions';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {PostType} from '../types/Post';
import AddCommentForm from './AddCommentForm';
import Comment from './Comment';

export interface CommentsProps {
  post: PostType;
}

export default function Comments(props: CommentsProps) {
  const {post} = props;

  const [isCommenting, setIsCommenting] = useState(false);

  const {comments} = useAppSelector(state => state.comments);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchComments(post.id));
  }, []);

  return (
    <View>
      <View style={styles.comments}>
        <View style={styles.fake_div} />
        <View>
          <Text style={styles.title}>Comments:</Text>
        </View>
        <View style={styles.plus_icon}>
          <TouchableWithoutFeedback
            onPress={() => setIsCommenting(!isCommenting)}>
            <Image
              source={require('../icons/plus.png')}
              style={{width: 25, height: 25, marginRight: 10}}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
      {isCommenting && (
        <AddCommentForm
          postId={post.id}
          index={-1}
          setIsCommenting={setIsCommenting}
        />
      )}
      {comments.map((comment, index) => (
        <Comment key={comment.id} comment={comment} index={index} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  comments: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  fake_div: {
    marginRight: 'auto',
    visibility: 'hidden',
    width: 25,
    height: 25,
  },
  plus_icon: {
    marginLeft: 'auto',
  },
});
