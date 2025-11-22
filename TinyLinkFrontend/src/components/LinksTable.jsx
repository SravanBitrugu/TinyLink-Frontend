import React from "react";
import API from "../api";

export default function LinksTable({ links, onDelete }) {
  const deleteLink = async (code) => {
    if (!window.confirm("Are you sure you want to delete this link?")) return;

    try {
      await API.delete(`/api/links/${code}`);
      onDelete();
    } catch (err) {
      alert("Failed to delete the link");
    }
  };

  return (
    <div className="card" style={{ marginTop: "25px" }}>
      <h3 style={{ marginBottom: "15px" }}>All Links</h3>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          overflow: "hidden",
          borderRadius: "8px",
          background: "#fafafa",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#007bff",
              color: "white",
              textAlign: "left",
            }}
          >
            <th style={{ padding: "10px" }}>Short URL</th>
            <th style={{ padding: "10px" }}>Original URL</th>
            <th style={{ padding: "10px" }}>Clicks</th>
            <th style={{ padding: "10px" }}>Last Clicked</th>
            <th style={{ padding: "10px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {links.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="empty-text"
                style={{
                  padding: "14px",
                  textAlign: "center",
                  color: "#555",
                }}
              >
                No links created yet.
              </td>
            </tr>
          ) : (
            links.map((item) => {
              const shortUrl = `${process.env.REACT_APP_API_URL}/${item.code}`;

              return (
                <tr
                  key={item.code}
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
                  <td style={{ padding: "10px" }}>
                    <a
                      className="code-link"
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#007bff",
                        textDecoration: "none",
                        fontWeight: "bold",
                      }}
                    >
                      {shortUrl}
                    </a>
                  </td>

                  <td
                    className="truncate"
                    style={{
                      padding: "10px",
                      maxWidth: "260px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.url}
                  </td>

                  <td style={{ padding: "10px" }}>{item.clicks}</td>
                  <td style={{ padding: "10px" }}>{item.lastClicked || "—"}</td>

                  <td style={{ padding: "10px" }}>
                    <button
                      className="delete-btn"
                      onClick={() => deleteLink(item.code)}
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
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
