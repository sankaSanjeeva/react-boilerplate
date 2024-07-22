import axios from 'axios';
import { useAuth } from '@/contexts';

const useAxios = () => {
  const { token, manageLogout } = useAuth();

  const apiInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
  });

  apiInstance.interceptors.request.use(
    async (config) => {
      const newConfig = { ...config };

      if (newConfig.headers && token) {
        newConfig.headers.Authorization = `Bearer ${token}`;
      }

      return newConfig;
    },
    (error) => Promise.reject(error)
  );

  apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        /**
         * TODO: add toast message
         */
        manageLogout();
      }
      return Promise.reject(error);
    }
  );

  return { api: apiInstance };
};

export default useAxios;
