import { useMutation } from "../../../hooks/useMutation";
import { sendMessageAPI } from "../../../helpers/index";
import { useUserContext } from "../../../contexts/UserContext";
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
    sendMessageAPI(user.id, sendMessageReq)
  );

  return { isSendingMessage, sendMessage };
}
