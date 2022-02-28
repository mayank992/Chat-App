import React, { useEffect, useRef } from "react";
import { Message } from "./Message";
import { MessageType } from "../../types";

type Props = {
  messages: MessageType[];
};

export function ChatFeed({ messages }: Props) {
  const chatFeedRef = useRef<HTMLDivElement>(null);

  function scrollToBottom() {
    if (chatFeedRef.current) {
      chatFeedRef.current.scrollTop = chatFeedRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat__feed" ref={chatFeedRef}>
      {messages.map((message) => {
        return <Message key={message.id} message={message} />;
      })}
    </div>
  );
}
