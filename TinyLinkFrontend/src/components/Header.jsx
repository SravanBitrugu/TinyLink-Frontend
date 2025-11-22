import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div
      className="navbar"
      style={{
        width: "100%",
        background: "#0d6efd",         
        padding: "12px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        boxSizing: "border-box",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      
      <div
        className="brand"
        style={{
          fontSize: "22px",
          fontWeight: "bold",
          letterSpacing: "0.5px",
        }}
      >
        TinyLink
      </div>

      
      <div
        className="nav-links"
        style={{
          display: "flex",
          gap: "18px",
          fontSize: "16px",
        }}
      >
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            transition: "0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          Dashboard
        </Link>

        <Link
          to="/healthz"
          style={{
            color: "white",
            textDecoration: "none",
            transition: "0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          Health
        </Link>
      </div>
    </div>
  );
}
