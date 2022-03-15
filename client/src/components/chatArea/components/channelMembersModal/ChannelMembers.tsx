import { useGetChannelMembers } from '../../hooks/useGetChannelMembers';
import { FullPageSpinner } from '../../../library/spinner';
import { ErrorMessage } from '../../../library/Messages';
import { List, ListItem } from '../../../library/list/index';

import userIcon from '../../../../assets/user.png';

export const ChannelMembers = ({ channelId }: { channelId: string }) => {
  const { members, isLoading, isError, error } = useGetChannelMembers(channelId);

  return (
    <div>
      {isLoading && <FullPageSpinner />}
      {isError && <ErrorMessage message={error.message} />}
      <List>
        {members?.map(member => (
          <ListItem key={member.id} style={{ height: '60px' }}>
            <img className="chat-members__icon" src={userIcon} alt="user-icon" />
            <p>{member.name}</p>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
