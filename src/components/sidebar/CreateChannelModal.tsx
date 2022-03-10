import React, { useState } from "react";
import { ButtonWithSpinner } from "../library/button/index";
import { ErrorMessage, SuccessMessage } from "../library/Messages";
import { useCreateChannel } from "./hooks/useCreateChannel";
import { Modal } from "../library/modal";

export function CreateChannelModal(props: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [channelName, setChannelName] = useState<string>("");
  const { isLoading, isError, error, isSuccess, mutate } = useCreateChannel();

  function handleCreateChannel(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate({ channelName });
  }

  return (
    <Modal title="Create channel" {...props}>
      <div className="create-channel">
        <form className="form" onSubmit={handleCreateChannel}>
          <label>
            Channel name:
            <input
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
          </label>
          <ButtonWithSpinner
            className="submit-btn"
            isLoading={isLoading}
            type="submit"
          >
            Create Channel
          </ButtonWithSpinner>
          {isSuccess && (
            <SuccessMessage message={"Channel created successfully."} />
          )}
          {isError && <ErrorMessage message={error?.message} />}
        </form>
      </div>
    </Modal>
  );
}
