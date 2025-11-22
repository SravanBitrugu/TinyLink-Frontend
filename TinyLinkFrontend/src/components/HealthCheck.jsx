import React, { useEffect, useState } from "react";
import API from "../api";

export default function HealthCheck() {
  const [status, setStatus] = useState("Checking...");

  const check = async () => {
    try {
      const res = await API.get("/healthz");
      setStatus(JSON.stringify(res.data, null, 2));
    } catch {
      setStatus("Server Down !");
    }
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <div
      className="card"
      style={{
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h2>System Health</h2>

      <pre
        className="health-box"
        style={{
          width: "100%",
          whiteSpace: "pre-wrap",    
          wordWrap: "break-word",     
          overflowX: "auto",          
          background: "#f5f5f5",
          padding: "10px",
          borderRadius: "8px",
          boxSizing: "border-box",
        }}
      >
        {status}
      </pre>
    </div>
  );
}
