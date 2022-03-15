import { useUserContext } from '../../contexts/UserContext';
import { CreateChannelModal } from './components/createChannelModal/CreateChannelModal';
import { AddUserDmModal } from './components/addUserDmModal/AddUserDmModal';
import { useGetUserDetails } from '../../hooks/useGetUserDetails';

import { ChannelList } from './components/channelList/index';

import './Sidebar.css';
import { ChannelType } from '../../types';

export const Sidebar = ({
  selectedChannel,
  onChannelChange,
}: {
  selectedChannel: ChannelType | null;
  onChannelChange: (channel: ChannelType) => void;
}) => {
  const [user] = useUserContext();
  const { userDetails } = useGetUserDetails();

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
          onClickAddIcon={() => {}}
        />
        <ChannelList
          channels={userDetails?.directMessages}
          onChannelChange={onChannelChange}
          selectedChannelId={selectedChannel?.id}
          channelListTitle="Direct Messages"
          onClickAddIcon={() => {}}
        />
      </div>
    </div>
  );
};
