import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, TextInput} from 'react-native';
import {addPost, fetchPosts} from '../store/actionCreators/postsActions';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {showAllPosts} from '../store/reducers/postsSlice';
import type {RootStackParamList} from '../types/RootStackParamList';

type Props = NativeStackScreenProps<RootStackParamList, 'AddPost'>;

export default function PostAddForm({route, navigation}: Props) {
  const {user} = useAppSelector(state => state.user);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    if (user) {
      await dispatch(addPost({title, text}));
      dispatch(fetchPosts());
      dispatch(showAllPosts());
      navigation.navigate('Main');
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.text}>Title</Text>
      <TextInput onChangeText={setTitle} style={styles.input} multiline />
      <Text style={styles.text}>Text</Text>
      <TextInput onChangeText={setText} style={styles.input} multiline />
      <Button onPress={() => handleSubmit()} title="Add post" />
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
