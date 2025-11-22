import { useState } from "react";
import API from "../api";

export default function CreateLink() {
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [result, setResult] = useState(null);

  const create = async () => {
    try {
      const res = await API.post("/api/links", { url, customCode });
      setResult(res.data);
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Something went wrong";
      setResult({ error: errorMsg });
    }
  };

  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "40px auto",
        padding: "25px",
        borderRadius: "12px",
        background: "#f8f9fa",
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
        fontFamily: "sans-serif"
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Create Short Link
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "15px"
          }}
        />

        <input
          type="text"
          placeholder="Custom code (optional)"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "15px"
          }}
        />

        <button
          onClick={create}
          style={{
            padding: "10px",
            borderRadius: "8px",
            background: "#007bff",
            color: "white",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          Create
        </button>
      </div>

      {result && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            borderRadius: "8px",
            background: "white",
            border: "1px solid #ddd"
          }}
        >
          {result.error && (
            <p style={{ color: "red", margin: 0 }}>
              <b>Error:</b> {result.error}
            </p>
          )}

          {result.shortUrl && (
            <>
              <p style={{ marginBottom: "6px" }}>
                <b>Short URL:</b>
              </p>
              <a
                href={result.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#007bff",
                  textDecoration: "none",
                  fontWeight: "bold"
                }}
              >
                {result.shortUrl}
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
}
