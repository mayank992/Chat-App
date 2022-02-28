import React, { useState, createContext } from "react";
import { UserType } from "../types";

type UserProviderProps = {
  children: React.ReactNode;
};

const defaultUser = {
  id: "",
  name: "",
  username: "",
};

export const UserContext = createContext<[UserType, any]>([
  defaultUser,
  () => {},
]);

export const UserProvider = ({
  children,
}: UserProviderProps): React.ReactElement => {
  const [user, setUser] = useState<UserType>(defaultUser);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};
