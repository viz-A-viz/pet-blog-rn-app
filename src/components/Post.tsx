import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  deletePost,
  likePost,
  unlikePost,
} from '../store/actionCreators/postsActions';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {showOnePost} from '../store/reducers/postsSlice';

import {PostType} from '../types/Post';
import Comments from './Comments';

export interface PostProps {
  post: PostType;
}

export default function Post(props: PostProps) {
  const {post} = props;
  const {user} = useAppSelector(state => state.user);
  const {showPost} = useAppSelector(state => state.posts);

  const [likes, setLikes] = useState(post._count.Likes);
  const [likedByUser, setLiked] = useState(false);
  const [myPost, setMyPost] = useState(false);

  const text = post.text.split('\n').join('\n\t');

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      setLiked(_.some(post.Likes, {userId: user.id}));
      setMyPost(user.id === post.userId);
    }
  }, []);

  const handleDelete = (id: number) => {
    dispatch(deletePost(id));
  };

  const handleLike = () => {
    if (user) {
      dispatch(likePost({postId: post.id, userId: user.id}))
        .then(() => setLiked(true))
        .then(() => setLikes(likes + 1));
    }
  };

  const handleUnlike = () => {
    if (user) {
      dispatch(unlikePost({postId: post.id, userId: user.id}))
        .then(() => setLiked(false))
        .then(() => setLikes(likes - 1));
    }
  };

  return (
    <View>
      <View style={styles.post}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.subtitle}>
          {`by ${post.Users.firstName} ${post.Users.lastName}, ${new Date(
            post.createdAt,
          ).toDateString()}`}
        </Text>
        <Text style={styles.text} numberOfLines={showPost ? 0 : 5}>
          {'\t'}
          {text}
        </Text>
        {showPost === 0 ? (
          <Text
            onPress={() => dispatch(showOnePost(post.id))}
            style={styles.fulltext}>
            Show full text
          </Text>
        ) : null}

        <View style={styles.footer}>
          {myPost ? (
            <View style={styles.footerLeft}>
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate('EditPost' as never, {post} as never)
                }>
                <Text style={styles.edit}>Edit</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => handleDelete(post.id)}>
                <Text style={styles.delete}>Delete</Text>
              </TouchableWithoutFeedback>
            </View>
          ) : null}
          <View style={styles.footerRight}>
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
      {showPost ? <Comments post={post} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    padding: 20,
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
    marginBottom: 15,
  },
  fulltext: {
    fontSize: 18,
    color: 'gray',
    marginVertical: 10,
    alignSelf: 'center',
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
    marginStart: 10,
  },
  edit: {
    fontSize: 18,
    marginHorizontal: 10,
    color: 'dodgerblue',
  },
  delete: {
    fontSize: 18,
    marginHorizontal: 10,
    color: 'red',
  },
});
