import React, { useState } from 'react'
import SearchBar from './components/SearchBar'
import UserList from './components/UserList'
import { searchUsers } from './services/github'

export default function App() {
  const [query, setQuery] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSearch(q) {
    setQuery(q)
    if (!q) {
      setUsers([])
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await searchUsers(q)
      setUsers(res.items || [])
    } catch (err) {
      setError(err.message || 'Search failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header>
        <h1>GitHub User Search</h1>
      </header>

      <main>
        <SearchBar onSearch={handleSearch} />
        {loading && <p>Loading...</p>}
        {error && <p role="alert">Error: {error}</p>}
        <UserList users={users} />
      </main>
    </div>
  )
}
