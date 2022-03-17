import { useCallback } from 'react';
import { useModal } from '../../../hooks/useModal';
import userIcon from '../../../assets/user.png';
import addUserIcon from '../../../assets/add-user.png';
import { ChannelMembersModal } from './channelMembersModal/index';
import { AddUserChannelModal } from './addUserChannelModal/index';

export const ChannelGroupActions = ({ channelId }: { channelId: string }) => {
  const { modalName, openModal, closeModal } = useModal<'channelMembers' | 'addUserChannel'>();

  const openAddUserChannelModal = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      openModal('addUserChannel');
    },
    [openModal]
  );

  const openChannelMembersModal = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      openModal('channelMembers');
    },
    [openModal]
  );

  return (
    <div className="chat-area__actions">
      <span className="chat__members" onClick={openChannelMembersModal}>
        <img className="chat-members__icon" src={userIcon} alt="user-img" />
      </span>
      <ChannelMembersModal channelId={channelId} isOpen={modalName === 'channelMembers'} onClose={closeModal} />
      <img className="add-user__icon" src={addUserIcon} alt="user-img" onClick={openAddUserChannelModal} />
      <AddUserChannelModal isOpen={modalName === 'addUserChannel'} onClose={closeModal} channelId={channelId} />
    </div>
  );
};
