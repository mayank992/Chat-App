import addUserIcon from '../../../assets/add-user.png';
import { ChannelMembersModal } from './channelMembersModal/index';
import { AddUserChannelModal } from './addUserChannelModal/index';
import userIcon from '../../../assets/user.png';
import { ChannelType } from '../../../types';

export function ChatHeader({ channel }: { channel: ChannelType }) {
  return (
    <header className="chat__header">
      <img className="chat__icon" src={userIcon} alt="user-img" />
      <p>{channel.name}</p>
      {channel.type === 'GROUP' && (
        <>
          <span className="chat__members" onClick={() => {}}>
            <img className="chat-members__icon" src={userIcon} alt="user-img" />
          </span>
          <ChannelMembersModal channelId={channel.id} isOpen={false} onClose={() => {}} />
          <img className="add-user__icon" src={addUserIcon} alt="user-img" onClick={() => {}} />
          <AddUserChannelModal isOpen={false} onClose={() => {}} channelId={channel.id} />
        </>
      )}
    </header>
  );
}
