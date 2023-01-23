import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AxiosError} from 'axios';
import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, TextInput} from 'react-native';
import {
  getUser,
  logIn,
  registerUser,
} from '../store/actionCreators/usersActions';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {AxiosResponseData} from '../types/AxiosResponseData';
import type {RootStackParamList} from '../types/RootStackParamList';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginPage({route, navigation}: Props) {
  const [registering, setRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useAppDispatch();

  const {user} = useAppSelector(state => state.user);

  navigation.setOptions({
    headerBackVisible: false,
  });

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if (user) {
      navigation.replace('Main');
    }
  }, [user]);

  const handleSubmitLogIn = async () => {
    const userLogIn = {email, password};
    const x = await dispatch(logIn(userLogIn));

    if (x.payload instanceof AxiosError && x.payload.response) {
      const data = x.payload.response.data as AxiosResponseData;
      const mess = data.message;
      setMessage(mess);
    }
    dispatch(getUser());
  };

  const handleSubmitRegister = async () => {
    const userRegister = {username, password, email, firstName, lastName};
    const newUser = await dispatch(registerUser(userRegister));

    if (newUser.payload instanceof AxiosError && newUser.payload.response) {
      const data = newUser.payload.response.data as AxiosResponseData;
      const mess = data.message;
      setMessage(mess);
    }
    dispatch(getUser());
  };

  return (
    <SafeAreaView>
      <Text style={styles.text}>Email</Text>
      <TextInput onChangeText={setEmail} value={email} style={styles.input} />
      {registering && (
        <>
          <Text style={styles.text}>Username</Text>
          <TextInput
            onChangeText={setUsername}
            value={username}
            style={styles.input}
          />

          <Text style={styles.text}>First Name</Text>
          <TextInput
            onChangeText={setFirstName}
            value={firstName}
            style={styles.input}
          />
          <Text style={styles.text}>Last Name</Text>
          <TextInput
            onChangeText={setLastName}
            value={lastName}
            style={styles.input}
          />
        </>
      )}
      <Text style={styles.text}>Password</Text>
      <TextInput
        onChangeText={setPassword}
        value={password}
        style={styles.input}
      />
      <Text style={styles.text}>{message}</Text>
      {registering ? (
        <>
          <Button onPress={handleSubmitRegister} title="Register" />
          <Button onPress={() => setRegistering(false)} title="Log in" />
        </>
      ) : (
        <Button onPress={handleSubmitLogIn} title="Log in" />
      )}
      {!registering && (
        <>
          <Text style={styles.text}>Not a member?</Text>
          <Button onPress={() => setRegistering(true)} title="Register" />
        </>
      )}
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
