import React, { useState, useContext } from "react";
import { UserType } from "../../types";
import { loginAPI } from "../../helpers/index";
import { UserContext } from "../../contexts/UserContext";
import "./Login.css";

type FormState = {
  username: string;
  firstname: string;
  lastname: string;
};

const initialFormState = {
  username: "",
  firstname: "",
  lastname: "",
};

type LoginProps = {
  onLogin: any;
};

export function Login({ onLogin }: LoginProps) {
  const [user, setUser] = useContext(UserContext);
  const [formState, setFormState] = useState<FormState>(initialFormState);

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // handle errors
    const userDetails: UserType = await loginAPI(formState);

    // set user details in the context so that the whole app
    // can access the user details easily.
    setUser(userDetails);

    // if successful
    onLogin();
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
          />
        </label>
        <label>
          First name
          <input
            className="login__input"
            name="firstname"
            value={formState.firstname}
            onChange={changeHandler}
          />
        </label>
        <label>
          Last name
          <input
            className="login__input"
            name="lastname"
            value={formState.lastname}
            onChange={changeHandler}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
