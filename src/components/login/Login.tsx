import React, { useState } from "react";
import { UserType } from "../../types";
import { loginAPI } from "../../helpers/index";
import "./Login.css";

export function Login({
  afterLogin,
}: {
  afterLogin: (user: UserType) => void;
}) {
  const [user, setUser] = useState<{
    username: string;
    firstname: string;
    lastname: string;
  }>({ username: "nishant444", firstname: "Nishant", lastname: "Sharma" });

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const userDetails: UserType = await loginAPI(user);

    afterLogin(userDetails);
  }

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
  }

  return (
    <div className="login">
      <div className="login__inner">
        <h1>Login</h1>
        <p>Welcome to the app</p>
        <form className="login__form" onSubmit={submitHandler}>
          <label>
            Username
            <input
              className="login__input"
              name="username"
              value={user.username}
              onChange={changeHandler}
              required
            />
          </label>
          <label>
            First name
            <input
              className="login__input"
              name="firstname"
              value={user.firstname}
              onChange={changeHandler}
              required
            />
          </label>
          <label>
            Last name
            <input
              className="login__input"
              name="lastname"
              value={user.lastname}
              onChange={changeHandler}
              required
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
