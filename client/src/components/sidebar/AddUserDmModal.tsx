import { useAddUserDm } from "./hooks/useAddUserDm";
import { AddUserForm } from "../AddUserForm";
import { Modal } from "../library/modal/index";

export function AddUserDmModal(props: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { isError, isSuccess, isLoading, error, mutate } = useAddUserDm();

  return (
    <Modal title="Add user" {...props}>
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
