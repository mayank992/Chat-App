import React, { useState } from "react";
import { ButtonWithSpinner } from "../common/button/index";
import { ErrorMessage, SuccessMessage } from "../common/Messages";
import { useCreateChannel } from "./hooks/useCreateChannel";

export function CreateChannel() {
  const [channelName, setChannelName] = useState<string>("");
  const { isLoading, isError, error, isSuccess, mutate } = useCreateChannel();

  function handleCreateChannel(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate({ channelName });
  }

  return (
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
  );
}
