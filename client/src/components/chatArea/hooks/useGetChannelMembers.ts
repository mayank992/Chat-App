import { useQuery } from "../../../hooks/useQuery";
import { ConnectionType } from "../../../types";
import { useUserContext } from "../../../contexts/UserContext";
import { client } from "../../../utils/apiClient";

export function useGetChannelMembers(channelId: string) {
  const [user] = useUserContext();
  const {
    data: members,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useQuery<ConnectionType[]>(
    [channelId],
    ({ signal }) =>
      client(`/channels/${channelId}/members`, user.id, { signal }),
    { pollingInterval: 5000 }
  );

  return { members, isSuccess, isLoading, isError, error };
}
