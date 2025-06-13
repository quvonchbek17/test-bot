// lib/UserContext.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

type UserContextType = {
  user: any;
  setUser: any
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: null
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Kontekstni ishlatish uchun yordamchi hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useSocket must be used within a UserProvider");
  }
  return context;
};
