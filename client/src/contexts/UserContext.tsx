import { useContext, createContext } from "react";
import { UserType } from "../types";

export const UserContext = createContext<[any, any]>([null, () => {}]);

export function useUserContext(): [any, any] {
  const value = useContext(UserContext);

  return value;
}
