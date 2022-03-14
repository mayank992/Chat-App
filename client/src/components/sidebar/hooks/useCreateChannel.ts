import { useMutation } from "../../../hooks/useMutation";
import { useUserContext } from "../../../contexts/UserContext";
import { Mutation } from "../../../types/hooksType";
import { client } from "../../../utils/apiClient";

type CreateChannelReq = {
  channelName: string;
};

export function useCreateChannel(): Mutation<
  any,
  { message: string },
  CreateChannelReq
> {
  const [user] = useUserContext();
  const mutation = useMutation<any, { message: string }, CreateChannelReq>(
    (createChannelReq: CreateChannelReq) =>
      client("/channels", user.id, {
        data: createChannelReq,
        method: "POST",
      })
  );

  return mutation;
}
