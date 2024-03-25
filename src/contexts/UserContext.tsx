import { User } from "@/api/user";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface UserContextType {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUserContext must be used within a useUserContextProvider"
    );
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
  user?: User;
}
export const UserProvider: React.FC<UserProviderProps> = ({
  children,
  user,
}) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  return user ? (
    <UserContext.Provider
      value={{
        user: currentUser,
        setUser: setCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  ) : null;
};
