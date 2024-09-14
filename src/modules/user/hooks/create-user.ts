import { useMutation } from '@tanstack/react-query';
import { CreateUser } from '../schema';
// import { useAxios } from '@/hooks';

const useCreateUser = () => {
  // const { api } = useAxios();

  const createUser = (data: CreateUser) => {
    // randomuser.me API doesn't have any APIs to create user. So here a Promise is returned for demo purpose
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...data, userId: '123456789' });
      }, 1000);
    }) as Promise<CreateUser & { userId: string }>;
  };

  return useMutation({
    mutationFn: createUser,
  });
};

export default useCreateUser;
