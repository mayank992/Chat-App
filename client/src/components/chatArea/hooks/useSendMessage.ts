import { useMutation } from '../../../hooks/useMutation';
import { useUserContext } from '../../../contexts/UserContext';
import { client } from '../../../utils/apiClient';

type SendMessageVariables = {
  channelId: string;
  message: string;
};

export function useSendMessage() {
  const [user] = useUserContext();
  const { isLoading: isSendingMessage, mutate: sendMessage } = useMutation<
    any,
    { message: string },
    SendMessageVariables
  >(({ channelId, message }: SendMessageVariables) => {
    return client(`/channels/${channelId}/messages`, user.id, {
      data: { text: message },
      method: 'POST',
    });
  });

  return { isSendingMessage, sendMessage };
}
