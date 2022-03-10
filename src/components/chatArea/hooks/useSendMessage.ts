import { useMutation } from "../../../hooks/useMutation";
import { useUserContext } from "../../../contexts/UserContext";
import { client } from "../../../utils/apiClient";
import { CHAT_TYPE } from "../../../constants";

type SendMessageReq = {
  type: CHAT_TYPE;
  to: string;
  message: string;
};

export function useSendMessage() {
  const [user] = useUserContext();
  const { isLoading: isSendingMessage, mutate: sendMessage } = useMutation<
    any,
    { message: string },
    SendMessageReq
  >((sendMessageReq: SendMessageReq) =>
    client("/messages", user.id, {
      data: sendMessageReq,
      method: "POST",
    })
  );

  return { isSendingMessage, sendMessage };
}
