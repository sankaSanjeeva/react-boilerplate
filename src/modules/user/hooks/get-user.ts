import { useQuery } from '@tanstack/react-query';
import { PaginatedResponse, User } from '@/types';
import { useAxios } from '@/hooks';

const useGetUser = (userId: string) => {
  const { api } = useAxios();

  const queryFn = async () => {
    const { data } =
      await api.get<PaginatedResponse<User>>('/?page=1&results=1');
    // randomuser.me API doesn't return data for individual users, So here 0 index has been taken
    return data.results[0];
  };

  return useQuery({
    queryKey: ['user', userId],
    queryFn,
    enabled: !!userId,
    refetchOnWindowFocus: false, // Disabled refetchOnWindowFocus feature since randomuser.me gives random data
  });
};

export default useGetUser;
