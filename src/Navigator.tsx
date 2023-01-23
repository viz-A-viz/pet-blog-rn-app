import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LoginPage from './components/LoginPage';
import Main from './components/Main';
import PostAddForm from './components/PostAddForm';
import PostEditForm from './components/PostEditForm';
import type {RootStackParamList} from './types/RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="EditPost" component={PostEditForm} />
        <Stack.Screen name="AddPost" component={PostAddForm} />
        <Stack.Screen name="Login" component={LoginPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
