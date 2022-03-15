import { CreateChannelForm } from './createChannelForm';
import { Modal } from '../../../library/modal';

export function CreateChannelModal(props: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal title="Create channel" {...props}>
      <CreateChannelForm />
    </Modal>
  );
}
