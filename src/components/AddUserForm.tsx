import React, { useState } from "react";
import { ButtonWithSpinner } from "./common/button/index";
import { ErrorMessage, SuccessMessage } from "./common/Messages";

type AddUserPropType = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: { message: string } | null;
  onAddUser: (data: { username: string }) => {};
};

export function AddUserForm({
  isLoading,
  isError,
  isSuccess,
  error,
  onAddUser,
}: AddUserPropType): React.ReactElement {
  const [username, setUsername] = useState<string>("");

  function handleAddUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onAddUser({ username });
  }

  return (
    <div className="add-user">
      <form className="form" onSubmit={handleAddUser}>
        <label>
          Username:
          <input
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <ButtonWithSpinner
          className="submit-btn"
          isLoading={isLoading}
          disabled={isLoading}
          type="submit"
        >
          Add user
        </ButtonWithSpinner>
        {isSuccess && <SuccessMessage message={"User added successfully."} />}
        {isError && <ErrorMessage message={error?.message} />}
      </form>
    </div>
  );
}
