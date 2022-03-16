import userIcon from '../../../assets/user.png';
import { ChannelType } from '../../../types';
import { ChannelGroupActions } from './ChannelGroupActions';

export function ChatHeader({ channel }: { channel: ChannelType }) {
  return (
    <header className="chat__header">
      <img className="chat__icon" src={userIcon} alt="user-img" />
      <p>{channel.name}</p>
      {channel.type === 'GROUP' && <ChannelGroupActions channelId={channel.id} />}
    </header>
  );
}
