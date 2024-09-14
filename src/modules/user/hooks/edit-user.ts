import { useMutation } from '@tanstack/react-query';
import { CreateUser } from '../schema';
// import { useAxios } from '@/hooks';

const useEditUser = () => {
  // const { api } = useAxios();

  const editUser = ({ userId, data }: { userId: string; data: CreateUser }) => {
    // randomuser.me API doesn't have any APIs to create user. So here a Promise is returned for demo purpose
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...data, userId });
      }, 1000);
    }) as Promise<CreateUser & { userId: string }>;
  };

  return useMutation({
    mutationFn: editUser,
  });
};

export default useEditUser;
