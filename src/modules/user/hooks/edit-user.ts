import { useMutation } from '@tanstack/react-query';
import { CreateUser } from '../schema';
// import { useAxios } from '@/hooks';

const useEditUser = () => {
  // const { api } = useAxios();

  const editUser = ({ userId, data }: { userId: string; data: CreateUser }) => {
    // randomuser.me API doesn't have any APIs to create user. So here a Promise.resolve(data) is returned for demo purpose
    return Promise.resolve({ ...data, userId });
  };

  return useMutation({
    mutationFn: editUser,
  });
};

export default useEditUser;
