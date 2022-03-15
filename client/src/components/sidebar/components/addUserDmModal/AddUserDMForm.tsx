import { useAddUserDm } from '../../hooks/useAddUserDm';
import { AddUserForm } from '../../../AddUserForm';

export const AddUserDMForm = () => {
  const { isError, isSuccess, isLoading, error, mutate } = useAddUserDm();

  return <AddUserForm isError={isError} isSuccess={isSuccess} isLoading={isLoading} error={error} onAddUser={mutate} />;
};
