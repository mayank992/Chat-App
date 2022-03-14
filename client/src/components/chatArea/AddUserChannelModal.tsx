import { useAddUserChannel } from "./hooks/useAddUserChannel";
import { AddUserForm } from "../AddUserForm";
import { Modal } from "../library/modal/index";

export function AddUserChannelModal({
  channelId,
  isOpen,
  onClose,
}: {
  channelId: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { isError, isSuccess, isLoading, error, mutate } =
    useAddUserChannel(channelId);

  return (
    <Modal title="Add user" isOpen={isOpen} onClose={onClose}>
      <AddUserForm
        isError={isError}
        isSuccess={isSuccess}
        isLoading={isLoading}
        error={error}
        onAddUser={mutate}
      />
    </Modal>
  );
}
