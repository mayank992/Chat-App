import { useQuery } from "./useQuery";
import { client } from "../utils/apiClient";
import { useUserContext } from "../contexts/UserContext";

export function useGetUserDetails() {
  const [user] = useUserContext();
  const {
    isError,
    error,
    isSuccess,
    data: userData,
    isLoading,
    isFetching,
    isIdle,
  } = useQuery<any>(
    [user.id],
    ({ signal }) => client("/users/alldetails", user.id, { signal }),
    { pollingInterval: 5000 }
  );

  return { userData, isLoading, isError, error, isSuccess, isFetching, isIdle };
}
