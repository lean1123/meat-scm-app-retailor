import { API_URL_PATH } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = API_URL_PATH || 'https://79d203b32ec2.ngrok-free.app/api/v1';
const PUBLIC_API_URL = [
  { urlPattern: /\/asserts(\/.*)?$/, methods: ['GET'] },
  { urlPattern: /\/auth\/login$/, methods: ['POST'] },
  { urlPattern: /\/auth\/register$/, methods: ['POST'] },
];

const axiosClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const isPublicEndpoint = PUBLIC_API_URL.some(
      (endpoint) =>
        endpoint.urlPattern.test(config.url || '') &&
        (endpoint.methods.length === 0 ||
          endpoint.methods.includes(config.method?.toUpperCase() || '')),
    );

    if (isPublicEndpoint) {
      return config;
    }

    const token = await SecureStore.getItem('userToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.log('Authentication Error: Token is invalid or expired.');

        AsyncStorage.removeItem('userToken');
      } else if (status === 500) {
        console.error('Server Error:', error.response.data);
      }
    } else if (error.request) {
      console.error('Network Error: No response received.', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
