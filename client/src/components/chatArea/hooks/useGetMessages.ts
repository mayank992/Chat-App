import { useUserContext } from '../../../contexts/UserContext';
import { useQuery } from '../../../hooks/useQuery';
import { MessageType } from '../../../types';
import { client } from '../../../utils/apiClient';

export function useGetMessages(channelId: string) {
  const [user] = useUserContext();
  const {
    data,
    refetchData: refetchMessages,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery<{ messages: MessageType[] }>(
    [channelId],
    ({ signal }) => client(`/channels/${channelId}/messages`, user.id, { signal }),
    { pollingInterval: 5000 }
  );

  return { messages: data?.messages, refetchMessages, isLoading, isSuccess, isError, error };
}
