import React, { useState, useCallback } from 'react';
import { ButtonWithSpinner } from './library/button/index';
import { ErrorMessage, SuccessMessage } from './library/Messages';

type AddUserPropType = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: { message: string } | null;
  onAddUser: (data: { username: string }) => void;
};

export function AddUserForm({ isLoading, isError, isSuccess, error, onAddUser }: AddUserPropType): React.ReactElement {
  const [username, setUsername] = useState<string>('');
  const isSubmitBtnDisabled = isLoading || username === '';

  const handleAddUser = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onAddUser({ username });
    },
    [onAddUser]
  );

  return (
    <div className="add-user">
      <form className="form" onSubmit={handleAddUser}>
        <label>
          Username:
          <input name="username" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <ButtonWithSpinner className="submit-btn" isLoading={isLoading} disabled={isSubmitBtnDisabled} type="submit">
          Add user
        </ButtonWithSpinner>
        {isSuccess && <SuccessMessage message={'User added successfully.'} />}
        {isError && <ErrorMessage message={error?.message} />}
      </form>
    </div>
  );
}
