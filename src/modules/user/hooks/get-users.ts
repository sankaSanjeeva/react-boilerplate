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
    // randomuser.me API doesn't return total record count since it returns random data. Therefore assumed it as 50 records
    data.info.totalRecords = 50;
    data.info.totalPages = 50 / PAGE_SIZE;
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
