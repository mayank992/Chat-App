import { useCallback } from 'react';
import { ListItem } from '../../../library/list/index';
import { ChannelType } from '../../../../types/index';

import hashIcon from '../../../../assets/hashtag.png';

type ChannelListItemProps = {
  channel: ChannelType;
  selectedChannelId?: string | null;
  onChannelChange: (channel: ChannelType) => void;
};

export const ChannelListItem = ({ channel, onChannelChange, selectedChannelId }: ChannelListItemProps) => {
  const handleChannelChange = useCallback(() => {
    onChannelChange(channel);
  }, [channel, onChannelChange]);

  return (
    <ListItem isActive={selectedChannelId === channel.id} onClick={handleChannelChange}>
      <img src={hashIcon} alt="channel-icon" style={{ maxHeight: '100%' }} />
      <p className="list-item__text">{channel.name}</p>
    </ListItem>
  );
};
