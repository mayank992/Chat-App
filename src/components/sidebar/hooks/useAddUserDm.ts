import { useMutation } from "../../../hooks/useMutation";
import { addUserDm } from "../../../helpers";
import { ReqError } from "../../../types/index";
import { useUserContext } from "../../../contexts/UserContext";

type AddUserReq = {
  username: string;
};

export function useAddUserDm() {
  const [user] = useUserContext();
  const mutation = useMutation<any, ReqError, AddUserReq>(
    (addUserReq: AddUserReq) => {
      return addUserDm(user.id, addUserReq);
    }
  );

  return mutation;
}
