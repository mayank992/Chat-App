import React, { useCallback } from 'react';
import { ChatFeed } from './components/ChatFeed';
import { ChatHeader } from './components/ChatHeader';
import { ChatFooter } from './components/ChatFooter';
import { useGetMessages } from './hooks/useGetMessages';
import { ChannelType } from '../../types';
import './ChatArea.css';

export const ChatArea = React.memo(({ channel }: { channel: ChannelType }) => {
  const { messages, isLoading, refetchMessages } = useGetMessages(channel.id);

  const handleSuccessMessageSend = useCallback(() => {
    refetchMessages();
  }, []);

  return (
    <div className="chat">
      <ChatHeader channel={channel} />
      <ChatFeed messages={messages || []} isLoadingMessages={isLoading} />
      <ChatFooter channelId={channel.id} onSuccessSendMessage={handleSuccessMessageSend} />
    </div>
  );
});
