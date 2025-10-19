// src/App.jsx
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ maxWidth: "700px", margin: "auto", padding: "20px" }}>
        <h1>React Query Demo</h1>
        <PostsComponent />
      </div>
    </QueryClientProvider>
    
  );
}
