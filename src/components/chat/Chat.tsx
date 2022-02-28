import React, { useState, useContext } from "react";
import { ChatFeed } from "./ChatFeed";
import userLogo from "../../assets/user.png";
import { MESSAGE_TYPE } from "../../constants/index";
import { getMessages, sendMessageAPI } from "../../helpers/index";
import { ChannelMembers } from "./ChannelMembers";
import { UserContext } from "../../contexts/UserContext";
import { MessageType } from "../../types";
import { usePolling } from "../../hooks/usePolling";

type Props = {
  chatType: MESSAGE_TYPE;
  id: string;
  name: string;
};

export function Chat({ chatType, id, name }: Props) {
  const [user] = useContext(UserContext);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageType[]>([]);

  async function refreshMessages() {
    const messages = await getMessages(user.id, chatType, id);

    setMessages(messages);
  }

  usePolling(refreshMessages, [chatType, id], 5000);

  async function handleMessageSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await sendMessageAPI({
      type: chatType,
      from: user.name,
      to: name,
      fromId: user.id,
      toId: id,
      text: message,
    });

    refreshMessages();

    setMessage("");
  }

  return (
    <div className="chat">
      <header className="chat__header">
        <img className="chat__icon" src={userLogo} alt="user-img" />
        <p>{name}</p>
        {chatType === MESSAGE_TYPE.CHANNEL && <ChannelMembers channelId={id} />}
      </header>
      <ChatFeed messages={messages} />
      <footer className="chat__footer">
        <form onSubmit={handleMessageSubmit}>
          <input
            className="chat__message-input"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="chat__send-btn"
            disabled={message === ""}
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}
