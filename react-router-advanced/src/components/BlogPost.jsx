import React from "react";
import { useParams } from "react-router-dom";

export default function BlogPost() {
  const { id } = useParams();

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Blog Post ID: {id}</h2>
      <p>This is a dynamic route that displays details for blog post {id}.</p>
    </div>
  );
}
