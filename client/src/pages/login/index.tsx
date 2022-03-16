import React, { useState, useContext } from 'react';
import { UserType } from '../../types';
import { client } from '../../utils/apiClient';
import { UserContext } from '../../contexts/UserContext';
import { useMutation } from '../../hooks/useMutation';
import { ErrorMessage } from '../../components/library/Messages';
import { ButtonWithSpinner } from '../../components/library/button';
import './Login.css';

type FormState = {
  username: string;
  firstname: string;
  lastname: string;
};

const initialFormState = {
  username: '',
  firstname: '',
  lastname: '',
};

export function Login() {
  const [, setUser] = useContext(UserContext);
  const [formState, setFormState] = useState<FormState>(initialFormState);

  // TODO - create seperate hook for this login mutation
  const { isError, error, mutate, isLoading } = useMutation<UserType, { message: string }, FormState>(
    ({ username, firstname, lastname }: FormState) =>
      client('/users/login', null, {
        method: 'POST',
        data: {
          username,
          name: `${firstname} ${lastname}`,
        },
      }),
    { onSuccess: setUser }
  );

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate(formState);
  }

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setFormState((formState: FormState) => ({
      ...formState,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <p>Welcome to the app</p>
      <form className="login__form" onSubmit={submitHandler}>
        <label>
          Username
          <input
            className="login__input"
            name="username"
            value={formState.username}
            onChange={changeHandler}
            required
          />
        </label>
        <label>
          First name
          <input
            className="login__input"
            name="firstname"
            value={formState.firstname}
            onChange={changeHandler}
            required
          />
        </label>
        <label>
          Last name
          <input
            className="login__input"
            name="lastname"
            value={formState.lastname}
            onChange={changeHandler}
            required
          />
        </label>
        <ButtonWithSpinner className="submit-btn" isLoading={isLoading} disabled={isLoading} type="submit">
          Login
        </ButtonWithSpinner>
        {isError && <ErrorMessage message={error?.message} />}
      </form>
    </div>
  );
}
