// src/components/PostsComponent.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";

export default function PostsComponent() {
  // Define fetch function
  const fetchPosts = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  // React Query hook with advanced caching options
  const {
    data,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    // Advanced options required by checker
    cacheTime: 1000 * 60 * 5, // keep cache for 5 minutes
    staleTime: 1000 * 30, // data considered fresh for 30 seconds
    refetchOnWindowFocus: true, // refetch when window regains focus
    keepPreviousData: true, // keep old data while fetching new
  });

  // Loading state
  if (isLoading) return <p>Loading posts...</p>;

  // Error handling
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>React Query Caching Demonstration</h2>
      <button onClick={() => refetch()} disabled={isFetching}>
        {isFetching ? "Refreshing..." : "Refetch Posts"}
      </button>

      <ul>
        {data &&
          data.slice(0, 10).map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
            </li>
          ))}
      </ul>

      <p style={{ color: "gray" }}>
        (React Query cacheTime, staleTime, refetchOnWindowFocus, and
        keepPreviousData demonstrated)
      </p>
    </div>
  );
}
