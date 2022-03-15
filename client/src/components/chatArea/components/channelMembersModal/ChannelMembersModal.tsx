import { ChannelMembers } from './ChannelMembers';
import { Modal } from '../../../library/modal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  channelId: string;
};

export function ChannelMembersModal({ isOpen, onClose, channelId }: Props) {
  return (
    <Modal title="Channel members" isOpen={isOpen} onClose={onClose}>
      <ChannelMembers channelId={channelId} />
    </Modal>
  );
}
