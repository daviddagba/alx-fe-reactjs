import React, { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('')

  function submit(e) {
    e.preventDefault()
    onSearch(q.trim())
  }

  return (
    <form onSubmit={submit} className="search-form">
      <input
        aria-label="Search users"
        placeholder="Search GitHub users..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  )
}
