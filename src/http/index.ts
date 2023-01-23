import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_URL = 'https://solo-project-blog-back-nestjs.onrender.com';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use(async config => {
  if (config.headers) {
    config.headers = {
      Authorization: `Bearer ${(await AsyncStorage.getItem('token')) || ''}`,
    };
  }
  return config;
});

export default $api;
