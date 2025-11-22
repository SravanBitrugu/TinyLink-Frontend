import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

function LinksList() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLinks = async () => {
    try {
      const res = await API.get("/api/links");
      setLinks(res.data);
    } catch (err) {
      setError("Failed to fetch links");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const deleteLink = async (code) => {
    if (!window.confirm("Are you sure you want to delete this link?")) return;
    try {
      await API.delete(`/api/links/${code}`);
      setLinks((prev) => prev.filter((l) => l.code !== code));
    } catch (err) {
      alert("Failed to delete the link");
    }
  };

  if (loading) return <p>Loading links...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>All Links</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "15px",
          background: "#fafafa",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr style={{ background: "#007bff", color: "white", textAlign: "left" }}>
            <th style={{ padding: "10px" }}>Code</th>
            <th style={{ padding: "10px" }}>URL</th>
            <th style={{ padding: "10px" }}>Clicks</th>
            <th style={{ padding: "10px" }}>Stats</th>
            <th style={{ padding: "10px" }}>Delete</th>
          </tr>
        </thead>

        <tbody>
          {links.map((l) => (
            <tr
              key={l.code}
              style={{
                borderBottom: "1px solid #ddd",
                background: "white",
                transition: "0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f0f8ff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "white")
              }
            >
              <td style={{ padding: "10px" }}>{l.code}</td>
              <td style={{ padding: "10px" }}>{l.url}</td>
              <td style={{ padding: "10px" }}>{l.clicks}</td>
              <td style={{ padding: "10px" }}>
                <Link
                  to={`/stats/${l.code}`}
                  style={{
                    color: "#007bff",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  View Stats
                </Link>
              </td>
              <td style={{ padding: "10px" }}>
                <button
                  onClick={() => deleteLink(l.code)}
                  style={{
                    background: "#ff4d4d",
                    color: "white",
                    border: "none",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LinkList;
