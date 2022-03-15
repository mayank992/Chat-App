import React, { useState, useCallback } from 'react';
import { useCreateChannel } from '../../hooks/useCreateChannel';

import { ButtonWithSpinner } from '../../../library/button';
import { SuccessMessage } from '../../../library/Messages';
import { ErrorMessage } from '../../../library/Messages';

export const CreateChannelForm = () => {
  const [channelName, setChannelName] = useState<string>('');
  const { isLoading, isError, error, isSuccess, mutate } = useCreateChannel();
  const isSubmitDisabled = channelName === '' || isLoading;

  const handleCreateChannel = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutate({ channelName });
    },
    [channelName]
  );

  const handleChannelNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setChannelName(e.target.value);
  }, []);

  return (
    <div className="create-channel">
      <form className="form" onSubmit={handleCreateChannel}>
        <label>
          Channel name:
          <input value={channelName} onChange={handleChannelNameChange} />
        </label>
        <ButtonWithSpinner className="submit-btn" isLoading={isLoading} disabled={isSubmitDisabled} type="submit">
          Create Channel
        </ButtonWithSpinner>
        {isSuccess && <SuccessMessage message={'Channel created successfully.'} />}
        {isError && <ErrorMessage message={error?.message} />}
      </form>
    </div>
  );
};
