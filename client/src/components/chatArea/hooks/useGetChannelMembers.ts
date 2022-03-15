import { useQuery } from '../../../hooks/useQuery';
import { UserType } from '../../../types';
import { useUserContext } from '../../../contexts/UserContext';
import { client } from '../../../utils/apiClient';

export function useGetChannelMembers(channelId: string) {
  const [user] = useUserContext();
  const { data, isSuccess, isLoading, isError, error } = useQuery<{ members: UserType[] }>(
    [channelId],
    ({ signal }) => client(`/channels/${channelId}/members`, user.id, { signal }),
    { pollingInterval: 5000 }
  );

  return { members: data?.members, isSuccess, isLoading, isError, error };
}
