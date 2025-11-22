import React, { useEffect, useState } from "react";
import LinkForm from "./LinkForm";
import LinksTable from "./LinksTable";

export default function Home() {
  const [links, setLinks] = useState([]);

  const fetchLinks = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/links`);
    const data = await res.json();
    setLinks(data);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h2 className="title">Dashboard</h2>

      <LinkForm onCreate={fetchLinks} />
      <LinksTable links={links} onDelete={fetchLinks} />
    </div>
  );
}
