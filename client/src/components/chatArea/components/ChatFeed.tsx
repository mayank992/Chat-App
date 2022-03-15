import React, { useRef, useLayoutEffect } from 'react';
import { FullPageSpinner } from '../../library/spinner';
import { Message } from './Message';
import { MessageType } from '../../../types/index';

type ChatFeedProps = {
  messages: MessageType[];
  isLoadingMessages: boolean;
};

export const ChatFeed = ({ messages, isLoadingMessages }: ChatFeedProps) => {
  const chatFeedRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (chatFeedRef.current) {
      chatFeedRef.current.scrollTop = chatFeedRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat__feed" ref={chatFeedRef}>
      {isLoadingMessages && <FullPageSpinner size="medium" />}
      {messages?.map(message => {
        return <Message key={message.id} message={message} />;
      })}
    </div>
  );
};
