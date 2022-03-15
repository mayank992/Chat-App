import { useMutation } from '../../../hooks/useMutation';
import { useUserContext } from '../../../contexts/UserContext';
import { client } from '../../../utils/apiClient';

type AddUserReq = {
  username: string;
};

export function useAddUserDm() {
  const [user] = useUserContext();
  const mutation = useMutation<any, { message: string }, AddUserReq>((addUserReq: AddUserReq) =>
    client('/connections', user.id, {
      data: addUserReq,
      method: 'POST',
    })
  );

  return mutation;
}
