import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function StatsPage() {
  const { code } = useParams();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLink = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await API.get(`/api/links/${code}`);
        setLink(res.data);
      } catch (err) {
        setError("Link not found or server error");
        setLink(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLink();
  }, [code]);

  if (loading)
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Loading link stats...
      </h2>
    );

  if (error)
    return (
      <h2 style={{ color: "red", textAlign: "center", marginTop: "40px" }}>
        {error}
      </h2>
    );

  const formatDate = (dateStr) => {
    if (!dateStr) return "Never";
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  return (
    <div
      className="card"
      style={{
        maxWidth: "600px",
        margin: "30px auto",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        background: "white",
        fontFamily: "sans-serif",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          textAlign: "center",
          color: "#0d6efd",
        }}
      >
        Stats for <code>{code}</code>
      </h2>

      <div
        className="stats-item"
        style={{
          marginBottom: "15px",
          padding: "12px",
          background: "#f8f9fa",
          borderRadius: "8px",
        }}
      >
        <b>Original URL:</b>{" "}
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0d6efd", fontWeight: "bold" }}
        >
          {link.url}
        </a>
      </div>

      <div
        className="stats-item"
        style={{
          marginBottom: "15px",
          padding: "12px",
          background: "#f8f9fa",
          borderRadius: "8px",
        }}
      >
        <b>Clicks:</b> {link.clicks}
      </div>

      <div
        className="stats-item"
        style={{
          marginBottom: "15px",
          padding: "12px",
          background: "#f8f9fa",
          borderRadius: "8px",
        }}
      >
        <b>Last Clicked:</b> {formatDate(link.lastClicked)}
      </div>
    </div>
  );
}

export default StatsPage;
