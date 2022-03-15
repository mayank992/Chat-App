import React, { useState, useRef } from "react";
import { ChatFeed } from "./ChatFeed";
import { ChatHeader } from "./ChatHeader";
import { CHAT_TYPE } from "../../constants/index";
import { ButtonWithSpinner } from "../library/button";
import { useSendMessage } from "./hooks/useSendMessage";
import "./ChatArea.css";

type Props = {
  chatType: CHAT_TYPE;
  chat: {
    id: string;
    name: string;
  };
};

export const ChatArea = React.memo(({ chatType, chat }: Props) => {
  const [message, setMessage] = useState<string>("");
  const chatFeedRef = useRef<{ refreshFeed: () => {} }>(null);
  const { isSendingMessage, sendMessage } = useSendMessage();

  async function handleMessageSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    sendMessage(
      { to: chat.id, message },
      {
        onSuccess: () => {
          chatFeedRef.current?.refreshFeed();
          setMessage("");
        },
      }
    );
  }

  return (
    <div className="chat">
      <ChatHeader chatType={chatType} chat={chat} />
      <ChatFeed chatType={chatType} chat={chat} ref={chatFeedRef} />
      <footer className="chat__footer">
        <form onSubmit={handleMessageSubmit}>
          <input
            className="chat__message-input"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <ButtonWithSpinner
            isLoading={isSendingMessage}
            disabled={message === "" || isSendingMessage}
            type="submit"
          >
            Send
          </ButtonWithSpinner>
        </form>
      </footer>
    </div>
  );
});
