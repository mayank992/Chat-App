import React, { useCallback } from 'react';
import { ChannelListItem } from './ChannelListItem';
import { Collapsible } from '../../../library/collapsible/Collapsible';
import { List } from '../../../library/list/index';
import { AddIcon } from '../../../library/icons';

import { ChannelType } from '../../../../types';

type ChannelListProps = {
  channels?: ChannelType[];
  selectedChannelId?: string | null;
  onChannelChange: (channel: ChannelType) => void;
  onClickAddIcon: React.MouseEventHandler<HTMLDivElement>;
  channelListTitle: string;
};

export const ChannelList = ({
  channels,
  onChannelChange,
  selectedChannelId,
  onClickAddIcon,
  channelListTitle,
}: ChannelListProps) => {
  return (
    <Collapsible defaultIsOpen={true}>
      <Collapsible.Slot name="header">
        <p className="list-item__text">{channelListTitle}</p>
        <AddIcon onClick={onClickAddIcon} />
      </Collapsible.Slot>
      <Collapsible.Slot name="body">
        <List>
          {channels?.map(channel => (
            <ChannelListItem
              key={channel.id}
              channel={channel}
              onChannelChange={onChannelChange}
              selectedChannelId={selectedChannelId}
            />
          ))}
        </List>
      </Collapsible.Slot>
    </Collapsible>
  );
};
