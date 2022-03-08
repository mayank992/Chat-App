import React, {
  useRef,
  useContext,
  useImperativeHandle,
  useLayoutEffect,
} from "react";
import { FullPageSpinner } from "../common/spinner";
import { Message } from "./Message";
import { MessageType } from "../../types";
import { getLatestMessages } from "../../helpers";
import { useQuery } from "../../hooks/useQuery";
import { UserContext } from "../../contexts/UserContext";
import { CHAT_TYPE } from "../../constants";

type ChatFeedProps = {
  chatType: CHAT_TYPE;
  id: string;
};

export const ChatFeed = React.forwardRef(
  ({ chatType, id }: ChatFeedProps, ref) => {
    const [user] = useContext(UserContext);
    const chatFeedRef = useRef<HTMLDivElement>(null);
    const {
      data: messages,
      refreshData,
      isLoading,
    } = useQuery<{ data: MessageType[] }>(
      [chatType, id],
      ({ signal }) => getLatestMessages(user.id, chatType, id, { signal }),
      { refetchInterval: 5000 }
    );

    useLayoutEffect(() => {
      if (chatFeedRef.current) {
        chatFeedRef.current.scrollTop = chatFeedRef.current.scrollHeight;
      }
    }, [messages]);

    useImperativeHandle(ref, () => ({
      refreshFeed: refreshData,
    }));

    return (
      <div className="chat__feed" ref={chatFeedRef}>
        {isLoading ? (
          <FullPageSpinner size="medium" />
        ) : (
          messages?.data.map((message) => {
            return <Message key={message.id} message={message} />;
          })
        )}
      </div>
    );
  }
);
