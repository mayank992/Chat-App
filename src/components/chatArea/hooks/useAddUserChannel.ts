import { useUserContext } from "../../../contexts/UserContext";
import { useMutation } from "../../../hooks/useMutation";
import { client } from "../../../utils/apiClient";

type AddUserReq = {
  username: string;
};

export function useAddUserChannel(channelId: string) {
  const [user] = useUserContext();
  const mutation = useMutation<any, { message: string }, AddUserReq>(
    (addUserReq: AddUserReq) =>
      client(`/channels/${channelId}/members`, user.id, {
        data: addUserReq,
        method: "POST",
      })
  );

  return mutation;
}
