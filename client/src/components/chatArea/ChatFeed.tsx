import React, { useRef, useImperativeHandle, useLayoutEffect } from "react";
import { FullPageSpinner } from "../library/spinner";
import { Message } from "./Message";
import { CHAT_TYPE } from "../../constants";
import { useGetMessages } from "./hooks/useGetMessages";
import { ErrorMessage } from "../library/Messages";

type ChatFeedProps = {
  chatType: CHAT_TYPE;
  id: string;
};

export const ChatFeed = React.forwardRef(
  ({ chatType, id }: ChatFeedProps, ref) => {
    const chatFeedRef = useRef<HTMLDivElement>(null);
    const { messages, isLoading, refetchData, isError, error } = useGetMessages(
      chatType,
      id
    );

    useLayoutEffect(() => {
      if (chatFeedRef.current) {
        chatFeedRef.current.scrollTop = chatFeedRef.current.scrollHeight;
      }
    }, [messages]);

    // instead of using imperative handler lift this messages state up
    useImperativeHandle(ref, () => ({
      refreshFeed: refetchData,
    }));

    return (
      <div className="chat__feed" ref={chatFeedRef}>
        {isLoading && <FullPageSpinner size="medium" />}
        {isError && <ErrorMessage message={error.message} />}
        {messages?.data.map((message) => {
          return <Message key={message.id} message={message} />;
        })}
      </div>
    );
  }
);
