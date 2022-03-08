import React, { useState } from "react";
import { useMutation } from "../../hooks/useMutation";
import { ButtonWithSpinner } from "../common/button/index";
import { addUser, addUserToChannel } from "../../helpers/index";
import { ErrorMessage, SuccessMessage } from "../common/Messages";
import { CHAT_TYPE } from "../../constants";
import { useUser } from "../../contexts/UserContext";

export function AddUser({ chatType, id }: { id: string; chatType: CHAT_TYPE }) {
  const [user] = useUser();
  const [username, setUsername] = useState<string>("");
  const { isLoading, isError, error, isSuccess, mutate } = useMutation<
    any,
    any
  >((username: string) => {
    if (chatType === CHAT_TYPE.DM) {
      return addUser(id, username);
    }

    return addUserToChannel(user.id, id, username);
  });

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function handleAddUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate(username);
  }

  return (
    <div className="add-user">
      <form className="form" onSubmit={handleAddUser}>
        <label>
          Username:
          <input value={username} onChange={onChange} />
        </label>
        <ButtonWithSpinner
          className="submit-btn"
          isLoading={isLoading}
          type="submit"
        >
          Add user
        </ButtonWithSpinner>
        {isSuccess && <SuccessMessage message={"User added successfully."} />}
        {isError && <ErrorMessage message={error.message} />}
      </form>
    </div>
  );
}
