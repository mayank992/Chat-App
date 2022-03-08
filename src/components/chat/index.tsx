import React, { useState, useContext, useRef } from "react";
import { ChatFeed } from "./ChatFeed";
import { ChatHeader } from "./ChatHeader";
import { CHAT_TYPE } from "../../constants/index";
import { sendMessage } from "../../helpers/index";
import { UserContext } from "../../contexts/UserContext";
import { Spinner } from "../common/spinner/index";
import { useMutation } from "../../hooks/useMutation";
import "./Chat.css";

type Props = {
  chatType: CHAT_TYPE;
  id: string;
  name: string;
};

export const Chat = React.memo(({ chatType, id, name }: Props) => {
  const [user] = useContext(UserContext);
  const [message, setMessage] = useState<string>("");
  const chatFeedRef = useRef<{ refreshFeed: () => {} }>(null);
  const { mutate: mutateMessage, isLoading: isMutatingMessage } = useMutation<
    any,
    any
  >(sendMessage, { onSuccess: chatFeedRef.current?.refreshFeed });

  async function handleMessageSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await mutateMessage({
      type: chatType,
      from: user.id,
      to: id,
      message,
    });

    setMessage("");
  }

  return (
    <div className="chat">
      <ChatHeader id={id} chatType={chatType} name={name} />
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
            {isMutatingMessage && <Spinner />}
          </button>
        </form>
      </footer>
    </div>
  );
});
