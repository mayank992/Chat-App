import { useState } from 'react';
import { SplitPane } from '../../components/library/splitPane/index';
import { Sidebar } from '../../components/sidebar/index';
import { ChatArea } from '../../components/chatArea';
import { ChannelType } from '../../types/index';
import './Main.css';

export default function Main() {
  const [selectedChannel, setSelectedChannel] = useState<ChannelType | null>(null);

  return (
    <div className="main">
      <div className="main__body">
        <SplitPane>
          <SplitPane.Slot name="leftPane">
            <Sidebar selectedChannel={selectedChannel} onChannelChange={setSelectedChannel} />
          </SplitPane.Slot>
          <SplitPane.Slot name="rightPane">
            {selectedChannel && <ChatArea key={selectedChannel.id} channel={selectedChannel} />}
          </SplitPane.Slot>
        </SplitPane>
      </div>
    </div>
  );
}
