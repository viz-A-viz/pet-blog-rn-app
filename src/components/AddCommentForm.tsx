import React from 'react';
import {Dispatch, SetStateAction, useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {addComment} from '../store/actionCreators/commentsActions';
import {useAppDispatch} from '../store/hooks';
import {CommentType} from '../types/Comment';

export interface CommentProps {
  comment?: CommentType;
  postId: number;
  index: number;
  setIsCommenting: Dispatch<SetStateAction<boolean>>;
}

export default function AddCommentForm(props: CommentProps) {
  const {comment, postId, index, setIsCommenting} = props;
  const [commentText, setCommentText] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    dispatch(
      addComment({
        parentId: comment?.id,
        postId,
        text: commentText,
        width: comment?.width || 100,
        index,
      }),
    );
    setIsCommenting(false);
  };

  return (
    <View style={styles.add_comment}>
      <TextInput
        style={styles.input}
        placeholder="Enter comment"
        onChangeText={setCommentText}
      />
      <Button onPress={handleSubmit} title="Confirm" />
    </View>
  );
}

const styles = StyleSheet.create({
  add_comment: {
    width: '90%',
    padding: 20,
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 15,
    marginRight: 10,
  },
  input: {
    fontSize: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    paddingLeft: 15,
    paddingTop: 10,
  },
});
