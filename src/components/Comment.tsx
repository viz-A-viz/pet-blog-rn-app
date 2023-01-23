import React from 'react';
import {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  deleteComment,
  fetchComments,
  likeComment,
  unlikeComment,
} from '../store/actionCreators/commentsActions';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {CommentType} from '../types/Comment';
import AddCommentForm from './AddCommentForm';

export interface CommentProps {
  comment: CommentType;
  index: number;
}

export default function Comment(props: CommentProps) {
  const {comment, index} = props;
  const {user} = useAppSelector(state => state.user);

  const [myComment, setMyComment] = useState(false);
  const [likes, setLikes] = useState(comment._count.Likes);
  const [likedByUser, setLiked] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      setMyComment(user.id === comment.userId);
    }
  }, []);

  const handleLike = () => {
    if (user) {
      dispatch(likeComment({commentId: comment.id, userId: user.id})).then(() =>
        dispatch(fetchComments(comment.postId)),
      );
      setLiked(true);
      setLikes(likes + 1);
    }
  };

  const handleUnlike = () => {
    if (user) {
      dispatch(unlikeComment({commentId: comment.id, userId: user.id})).then(
        () => dispatch(fetchComments(comment.postId)),
      );
      setLiked(false);
      setLikes(likes - 1);
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deleteComment(id));
    dispatch(fetchComments(comment.postId));
  };

  return (
    <View>
      <View style={{...styles.post, width: `${comment.width}%`}}>
        <Text
          style={
            styles.title
          }>{`${comment.user.firstName} ${comment.user.lastName}`}</Text>
        <Text style={styles.subtitle}>
          {new Date(comment.createdAt).toDateString()}
        </Text>
        <Text style={styles.text}>{comment.text}</Text>
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            {myComment && (
              <TouchableWithoutFeedback
                onPress={() => handleDelete(comment.id)}>
                <Text style={styles.delete}>Delete</Text>
              </TouchableWithoutFeedback>
            )}
          </View>
          <View style={styles.footerRight}>
            <TouchableWithoutFeedback
              onPress={() => setIsCommenting(!isCommenting)}>
              <Image
                source={require('../icons/comments.png')}
                style={{width: 25, height: 25, marginRight: 10}}
              />
            </TouchableWithoutFeedback>
            {likedByUser ? (
              <TouchableWithoutFeedback onPress={handleUnlike}>
                <Image
                  source={require('../icons/heartFilled.png')}
                  style={{width: 25, height: 25}}
                />
              </TouchableWithoutFeedback>
            ) : (
              <TouchableWithoutFeedback onPress={handleLike}>
                <Image
                  source={require('../icons/heartEmpty.png')}
                  style={{width: 25, height: 25}}
                />
              </TouchableWithoutFeedback>
            )}
            <Text style={styles.likes}>{likes}</Text>
          </View>
        </View>
      </View>
      {isCommenting && (
        <AddCommentForm
          comment={comment}
          postId={comment.postId}
          index={index}
          setIsCommenting={setIsCommenting}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    padding: 20,
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 15,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'center',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 5,
    alignSelf: 'center',
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '50%',
  },
  footerRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '50%',
  },
  likes: {
    fontSize: 18,
    marginStart: 7,
  },
  delete: {
    fontSize: 18,
    marginHorizontal: 10,
    color: 'red',
  },
});
