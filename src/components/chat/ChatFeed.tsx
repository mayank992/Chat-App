import { useState, useContext } from "react";
import { Message } from "./Message";
import { MessageType } from "../../types";
import { MESSAGE_TYPE } from "../../constants";
import { usePolling } from "../../hooks/usePolling";
import { UserContext } from "../../contexts/UserContext";
import { getMessages } from "../../helpers/index";

type Props = {
  chatType: MESSAGE_TYPE;
  id: string;
};

export function ChatFeed({ chatType, id }: Props) {
  const user = useContext(UserContext);
  const [messages, setMessages] = useState<MessageType[]>([]);

  async function refreshMessages() {
    const messages = await getMessages(user.id, chatType, id);

    setMessages(messages);
  }

  usePolling(refreshMessages, [chatType, id], 5000);

  return (
    <div className="chat__feed">
      {messages.map((message) => {
        return <Message key={message.id} message={message} />;
      })}
    </div>
  );
}
