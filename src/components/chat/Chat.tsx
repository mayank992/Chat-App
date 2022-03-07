import React, { useState, useContext, useRef } from "react";
import { ChatFeed } from "./ChatFeed";
import userLogo from "../../assets/user.png";
import { CHAT_TYPE } from "../../constants/index";
import { sendMessageAPI } from "../../helpers/index";
import { ChannelMembers } from "./ChannelMembers";
import { UserContext } from "../../contexts/UserContext";

type Props = {
  chatType: CHAT_TYPE;
  id: string;
  name: string;
};

export const Chat = React.memo(({ chatType, id, name }: Props) => {
  const [user] = useContext(UserContext);
  const [message, setMessage] = useState<string>("");
  const chatFeedRef = useRef<{ refreshFeed: () => {} }>(null);

  async function handleMessageSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // use useMutation api
    await sendMessageAPI({
      type: chatType,
      from: user.name,
      to: name,
      fromId: user.id,
      toId: id,
      text: message,
    });

    // TODO - abort this request if selected tab changes
    chatFeedRef.current?.refreshFeed();

    setMessage("");
  }

  return (
    <div className="chat">
      <header className="chat__header">
        <img className="chat__icon" src={userLogo} alt="user-img" />
        <p>{name}</p>
        {chatType === CHAT_TYPE.CHANNEL && <ChannelMembers channelId={id} />}
      </header>
      <ChatFeed chatType={chatType} id={id} ref={chatFeedRef} />
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
});
