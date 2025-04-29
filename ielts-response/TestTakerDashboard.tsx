import React from "react";
import { useWebSocket } from "../services/WebSocketService";

const TestTakerDashboard: React.FC = () => {
  const message = useWebSocket();

  return (
    <div className="dashboard">
      <h1>Test Taker Dashboard</h1>
      {message && <div className="notification-bar">{message}</div>}
    </div>
  );
};

export default TestTakerDashboard;
