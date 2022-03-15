import { AddUserChannelForm } from './AddUserChannelForm';
import { Modal } from '../../../library/modal/index';

export function AddUserChannelModal({
  channelId,
  isOpen,
  onClose,
}: {
  channelId: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal title="Add user" isOpen={isOpen} onClose={onClose}>
      <AddUserChannelForm channelId={channelId} />
    </Modal>
  );
}
