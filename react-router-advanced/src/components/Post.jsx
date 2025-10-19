import React from "react";
import { useParams } from "react-router-dom";

export default function Post() {
  const { postId } = useParams();

  return (
    <div>
      <h2>Post ID: {postId}</h2>
      <p>This is a dynamically loaded blog post with ID {postId}.</p>
    </div>
  );
}
