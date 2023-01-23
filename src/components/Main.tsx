import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import type {RootStackParamList} from '../types/RootStackParamList';

import {logOut} from '../store/actionCreators/usersActions';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {showingModal} from '../store/reducers/postsSlice';
import Posts from './Posts';
import Sort from './Sort';

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

export default function Main({route, navigation}: Props) {
  const {showPost, onlyMyPosts} = useAppSelector(state => state.posts);
  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    await dispatch(logOut());
    navigation.navigate('Login');
  };

  navigation.setOptions({
    headerRight: () => (
      <>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('AddPost')}>
          <Text style={styles.menu}>+</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => dispatch(showingModal(true))}>
          <Text style={styles.menu}>...</Text>
        </TouchableWithoutFeedback>
      </>
    ),
    headerLeft: () => (
      <>
        <TouchableWithoutFeedback onPress={handleLogOut}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableWithoutFeedback>
      </>
    ),
    headerBackTitleVisible: true,
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={styles.header}>Just a blog</Text>
        {!showPost && <Sort />}
        <Posts />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    fontSize: 30,
    marginVertical: 20,
  },
  menu: {
    fontSize: 24,
    color: 'dodgerblue',
    marginHorizontal: 10,
  },
  logout: {
    fontSize: 18,
    color: 'red',
    marginHorizontal: 10,
  },
});
