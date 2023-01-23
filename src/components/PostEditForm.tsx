import React, {useEffect, useState} from 'react';
import {useAppDispatch} from '../store/hooks';
import {showAllPosts} from '../store/reducers/postsSlice';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../types/RootStackParamList';
import {Button, SafeAreaView, StyleSheet, Text, TextInput} from 'react-native';
import {editPost, fetchPosts} from '../store/actionCreators/postsActions';

type Props = NativeStackScreenProps<RootStackParamList, 'EditPost'>;

export default function PostEditForm({route, navigation}: Props) {
  const {post} = route.params;
  const {id, title, text} = post;
  const [idEdit, setId] = useState(0);
  const [titleEdit, setTitle] = useState('');
  const [textEdit, setText] = useState('');

  useEffect(() => {
    setTitle(title);
    setText(text);
    setId(id);
  }, [id, title, text]);

  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    await dispatch(editPost({idEdit, titleEdit, textEdit}));
    dispatch(fetchPosts());
    dispatch(showAllPosts());
    navigation.navigate('Main');
  };

  return (
    <SafeAreaView>
      <Text style={styles.text}>Title</Text>
      <TextInput
        onChangeText={setTitle}
        value={titleEdit}
        style={styles.input}
        multiline
      />
      <Text style={styles.text}>Text</Text>
      <TextInput
        onChangeText={setText}
        value={textEdit}
        style={styles.input}
        multiline
      />
      <Button onPress={() => handleSubmit()} title="Submit" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    fontSize: 20,
    marginVertical: 10,
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
