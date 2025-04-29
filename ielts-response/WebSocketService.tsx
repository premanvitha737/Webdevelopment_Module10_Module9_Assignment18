import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";

const socket: Socket = io("http://localhost:5000");

export const useWebSocket = () => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    socket.on("update", (data) => {
      setMessage(data.message);
    });

    socket.on("test_status", (data) => {
      setMessage(data.status);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return message;
};
