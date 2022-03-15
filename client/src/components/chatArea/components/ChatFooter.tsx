import React, { useCallback, useState } from 'react';
import { ButtonWithSpinner } from '../../library/button';
import { useSendMessage } from '../hooks/useSendMessage';

export const ChatFooter = ({
  channelId,
  onSuccessSendMessage,
}: {
  channelId: string;
  onSuccessSendMessage: () => void;
}) => {
  const [message, setMessage] = useState<string>('');
  const { isSendingMessage, sendMessage } = useSendMessage();
  const isSendBtnDisabled = message === '' || isSendingMessage;

  const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }, []);

  function handleMessageSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    sendMessage(
      { channelId, message },
      {
        onSuccess: () => {
          onSuccessSendMessage();
          setMessage('');
        },
      }
    );
  }

  return (
    <footer className="chat__footer">
      <form onSubmit={handleMessageSubmit}>
        <input className="chat__message-input" placeholder="Message" value={message} onChange={handleMessageChange} />
        <ButtonWithSpinner isLoading={isSendingMessage} disabled={isSendBtnDisabled} type="submit">
          Send
        </ButtonWithSpinner>
      </form>
    </footer>
  );
};
