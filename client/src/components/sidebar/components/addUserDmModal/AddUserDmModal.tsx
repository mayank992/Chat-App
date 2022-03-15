import { Modal } from '../../../library/modal/index';
import { AddUserDMForm } from './AddUserDMForm';

export function AddUserDmModal(props: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal title="Add user" {...props}>
      <AddUserDMForm />
    </Modal>
  );
}
