import { useUserContext } from '../../contexts/UserContext';
import { CreateChannelModal } from './components/createChannelModal/CreateChannelModal';
import { AddUserDmModal } from './components/addUserDmModal/AddUserDmModal';
import { useGetUserDetails } from '../../hooks/useGetUserDetails';
import { useModal } from '../../hooks/useModal';

import { ChannelList } from './components/channelList/index';

import './Sidebar.css';
import { ChannelType } from '../../types';
import React, { useCallback } from 'react';

export const Sidebar = ({
  selectedChannel,
  onChannelChange,
}: {
  selectedChannel: ChannelType | null;
  onChannelChange: (channel: ChannelType) => void;
}) => {
  const [user] = useUserContext();
  const { userDetails } = useGetUserDetails();
  const { modalName, openModal, closeModal } = useModal<'createChannel' | 'addUserDm'>();

  const openAddUserDmModal = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      openModal('addUserDm');
    },
    [openModal]
  );

  const openCreateChannelModal = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      openModal('createChannel');
    },
    [openModal]
  );

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <h2>{user.username}</h2>
      </div>
      <div className="sidebar__body">
        <ChannelList
          channels={userDetails?.channels}
          onChannelChange={onChannelChange}
          selectedChannelId={selectedChannel?.id}
          channelListTitle="Channels"
          onClickAddIcon={openCreateChannelModal}
        />
        <CreateChannelModal isOpen={modalName === 'createChannel'} onClose={closeModal} />
        <ChannelList
          channels={userDetails?.directMessages}
          onChannelChange={onChannelChange}
          selectedChannelId={selectedChannel?.id}
          channelListTitle="Direct Messages"
          onClickAddIcon={openAddUserDmModal}
        />
        <AddUserDmModal isOpen={modalName === 'addUserDm'} onClose={closeModal} />
      </div>
    </div>
  );
};
