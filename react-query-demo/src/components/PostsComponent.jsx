// src/components/PostsComponent.jsx
import { useQuery } from "react-query";
import { useQuery } from "@tanstack/react-query";


// Fetch function
const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default function PostsComponent() {
  // useQuery hook for fetching data
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery("posts", fetchPosts);

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  if (isError) {
    return <p style={{ color: "red" }}>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>Posts List</h2>
      <button
        onClick={() => refetch()}
        disabled={isFetching}
        style={{ marginBottom: "10px" }}
      >
        {isFetching ? "Refreshing..." : "Refetch Posts"}
      </button>

      <ul>
        {posts.slice(0, 10).map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
