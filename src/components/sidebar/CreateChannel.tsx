import React, { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { useMutation } from "../../hooks/useMutation";
import { createChannel } from "../../helpers/index";
import { ButtonWithSpinner } from "../common/button/index";
import { ErrorMessage, SuccessMessage } from "../common/Messages";

export function CreateChannel() {
  const [user] = useUser();
  const [channelName, setChannelName] = useState<string>("");
  const { isLoading, isError, error, isSuccess, mutate } = useMutation<
    any,
    any
  >((channelName: string) => createChannel(user.id, channelName));

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setChannelName(e.target.value);
  }

  function handleCreateChannel(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate(channelName);
  }

  return (
    <div className="create-channel">
      <form className="form" onSubmit={handleCreateChannel}>
        <label>
          Channel name:
          <input value={channelName} onChange={onChange} />
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
        {isError && <ErrorMessage message={error.message} />}
      </form>
    </div>
  );
}
