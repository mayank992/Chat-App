import { useAddUserChannel } from '../../hooks/useAddUserChannel';
import { AddUserForm } from '../../../AddUserForm';

export const AddUserChannelForm = ({ channelId }: { channelId: string }) => {
  const { isError, isSuccess, isLoading, error, mutate } = useAddUserChannel(channelId);

  return <AddUserForm isError={isError} isSuccess={isSuccess} isLoading={isLoading} error={error} onAddUser={mutate} />;
};
