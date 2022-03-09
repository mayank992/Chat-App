import { useMutation } from "../../../hooks/useMutation";
import { addUserChannel } from "../../../helpers";
import { ReqError } from "../../../types/index";

type AddUserReq = {
  username: string;
};

export function useAddUserChannel(channelId: string) {
  const mutation = useMutation<any, ReqError, AddUserReq>(
    (addUserReq: AddUserReq) => {
      return addUserChannel(channelId, addUserReq);
    }
  );

  return mutation;
}
