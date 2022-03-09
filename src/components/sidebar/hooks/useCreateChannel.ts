import { useMutation } from "../../../hooks/useMutation";
import { createChannel } from "../../../helpers/index";
import { useUserContext } from "../../../contexts/UserContext";

type CreateChannelReq = {
  channelName: string;
};

export function useCreateChannel() {
  const [user] = useUserContext();
  const mutation = useMutation<any, { message: string }, CreateChannelReq>(
    (createChannelReq: CreateChannelReq) =>
      createChannel(user.id, createChannelReq)
  );

  return mutation;
}
