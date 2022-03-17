import { useQuery } from './useQuery';
import { client } from '../utils/apiClient';
import { useUserContext } from '../contexts/UserContext';
import { UserDetailsType } from '../types/index';

export function useGetUserDetails() {
  const [user] = useUserContext();
  const {
    isError,
    error,
    isSuccess,
    data: userDetails,
    isLoading,
    isFetching,
    isIdle,
  } = useQuery<UserDetailsType>([user.id], ({ signal }) => client('/users/alldetails', user.id, { signal }), {
    pollingInterval: 5000,
  });

  return { userDetails, isLoading, isError, error, isSuccess, isFetching, isIdle };
}
