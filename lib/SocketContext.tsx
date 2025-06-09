// lib/SocketContext.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

type SocketContextType = {
  coinSocket: Socket | null;
  usersSocket: Socket | null;
};

const SocketContext = createContext<SocketContextType>({
  coinSocket: null,
  usersSocket: null
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [coinSocket, setCoinSocket] = useState<Socket | null>(null);
  const [usersSocket, setUsersSocket] = useState<Socket | null>(null);

  useEffect(() => {

    const coinSocketUrl = process.env.NEXT_PUBLIC_COIN_SOCKET_URL;
    const usersSocketUrl = process.env.NEXT_PUBLIC_USERS_SOCKET_URL;
    // Coin Socket ulanishi
    const coinSocketInstance = io(coinSocketUrl);

    coinSocketInstance.on("connect", () => {
      // console.log("Coin Socket ulandi:", coinSocketInstance.id);
    });

    coinSocketInstance.on("disconnect", () => {
      // console.log("Coin Socket uzildi");
    });

    coinSocketInstance.on("error", (error) => {
      // console.error("Coin Socket xatosi:", error);
    });

    // Notification Socket ulanishi
    const usersSocketInstance = io(usersSocketUrl);

    usersSocketInstance.on("connect", () => {
      // console.log("Notification Socket ulandi:", usersSocketInstance.id);
    });

    usersSocketInstance.on("disconnect", () => {
      // console.log("Notification Socket uzildi");
    });

    usersSocketInstance.on("error", (error) => {
      // console.error("Notification Socket xatosi:", error);
    });

    // Agar 3-chi socket kerak bo‘lsa

    // Socketlarni holatga o‘rnatish
    setCoinSocket(coinSocketInstance);
    setUsersSocket(usersSocketInstance);

    // Komponent o‘chirilganda tozalash
    return () => {
      coinSocketInstance.disconnect();
      usersSocketInstance.disconnect();
      setCoinSocket(null);
      setUsersSocket(null);
    };
  }, []); // Bo‘sh dependency array - faqat bir marta ishlaydi

  return (
    <SocketContext.Provider value={{ coinSocket, usersSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

// Kontekstni ishlatish uchun yordamchi hook
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};