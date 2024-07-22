import { useInfiniteQuery } from '@tanstack/react-query';
import { PaginatedResponse, User } from '@/types';
import { useAxios } from '@/hooks';
import { PAGE_SIZE } from '@/constants';

const useGetUsers = () => {
  const { api } = useAxios();

  const queryFn = async ({ pageParam }: { pageParam: number }) => {
    const { data } = await api.get<PaginatedResponse<User>>(
      `/?page=${pageParam}&results=${PAGE_SIZE}`
    );
    // randomuser.me API doesn't return total page count since it returns random data. Therefore assumed it as 5 pages
    data.info.totalPages = 5;
    return data;
  };

  return useInfiniteQuery({
    queryKey: ['users'],
    queryFn,
    initialPageParam: 1,
    refetchOnWindowFocus: false, // Disabled refetchOnWindowFocus feature since randomuser.me gives random data
    getNextPageParam: (lastPage) => {
      if (lastPage.info.totalPages! > lastPage.info.page) {
        return lastPage.info.page + 1;
      }
      return undefined;
    },
  });
};

export default useGetUsers;
