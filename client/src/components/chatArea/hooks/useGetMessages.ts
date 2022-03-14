import { CHAT_TYPE } from "../../../constants";
import { useUserContext } from "../../../contexts/UserContext";
import { useQuery } from "../../../hooks/useQuery";
import { MessageType } from "../../../types";
import { client } from "../../../utils/apiClient";

export function useGetMessages(chatType: CHAT_TYPE, id: string) {
  const [user] = useUserContext();
  const {
    data: messages,
    refetchData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery<{ data: MessageType[] }>(
    [chatType, id],
    ({ signal }) => {
      const url =
        chatType === CHAT_TYPE.DM
          ? `/connections/${id}/messages`
          : `/channels/${id}/messages`;

      return client(url, user.id, { signal });
    },
    { pollingInterval: 5000 }
  );

  return { messages, refetchData, isLoading, isSuccess, isError, error };
}
