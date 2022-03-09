import { useAddUserDm } from "./hooks/useAddUserDm";
import { AddUserForm } from "../AddUserForm";

export function AddUserDm() {
  const { isError, isSuccess, isLoading, error, mutate } = useAddUserDm();

  return (
    <AddUserForm
      isError={isError}
      isSuccess={isSuccess}
      isLoading={isLoading}
      error={error}
      onAddUser={mutate}
    />
  );
}
