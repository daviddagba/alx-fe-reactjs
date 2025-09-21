// src/components/SearchAdvanced.jsx
import React, { useState } from 'react'
import { searchUsers, fetchUserData } from '../services/githubService'

export default function SearchAdvanced() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [minRepos, setMinRepos] = useState('')
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [perPage] = useState(20)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function performSearch({ reset = true } = {}) {
    if (reset) {
      setPage(1)
      setUsers([])
      setTotalCount(0)
    }
    setLoading(true)
    setError(null)
    try {
      const res = await searchUsers({
        query,
        location,
        minRepos: minRepos ? Number(minRepos) : undefined,
        page: reset ? 1 : page,
        per_page: perPage
      })
      // append if loading more
      setUsers(prev => (reset ? res.items : [...prev, ...res.items]))
      setTotalCount(res.total_count || 0)
      setPage(prev => (reset ? 2 : prev + 1))
    } catch (err) {
      setError(err.message || 'Search failed')
    } finally {
      setLoading(false)
    }
  }

  function onSubmit(e) {
    e.preventDefault()
    performSearch({ reset: true })
  }

  async function loadMore() {
    // If no more results, ignore
    if (users.length >= totalCount) return
    setLoading(true)
    setError(null)
    try {
      const res = await searchUsers({
        query,
        location,
        minRepos: minRepos ? Number(minRepos) : undefined,
        page,
        per_page: perPage
      })
      setUsers(prev => [...prev, ...res.items])
      setPage(prev => prev + 1)
    } catch (err) {
      setError(err.message || 'Failed to load more')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="p-4 bg-slate-50 rounded-lg">
      <h3 className="section-title">Advanced Search</h3>

      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <input
          className="p-2 border rounded"
          placeholder="Keyword or username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          className="p-2 border rounded"
          placeholder="Location (city, country)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          className="p-2 border rounded"
          placeholder="Min public repos"
          type="number"
          min="0"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => { setQuery(''); setLocation(''); setMinRepos(''); setUsers([]); setError(null) }}
            className="px-3 py-2 border rounded"
          >
            Reset
          </button>
        </div>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      <div className="grid gap-3">
        {users.length === 0 && !loading && <p>No results</p>}
        {users.map(u => (
          <UserCardLite key={u.id} user={u} />
        ))}
      </div>

      {users.length > 0 && users.length < totalCount && (
        <div className="mt-4">
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-gray-800 text-white rounded"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load more'}
          </button>
        </div>
      )}
    </section>
  )
}

/* Minimal lightweight user card that fetches details on demand */
function UserCardLite({ user }) {
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)

  async function loadDetails() {
    if (details || loading) return
    setLoading(true)
    setErr(null)
    try {
      const data = await fetchUserData(user.login)
      setDetails(data)
    } catch (e) {
      setErr('Failed to load user details')
    } finally {
      setLoading(false)
    }
  }

  return (
    <article className="user-card">
      <img src={user.avatar_url} alt={`${user.login} avatar`} className="w-16 h-16 rounded" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <a className="font-medium" href={user.html_url} target="_blank" rel="noreferrer">{user.login}</a>
            <div className="text-sm text-gray-600">Score: {user.score ? user.score.toFixed(2) : '-'}</div>
          </div>
          <div>
            <button onClick={loadDetails} className="px-2 py-1 border rounded text-sm">View</button>
          </div>
        </div>

        {loading && <p className="text-sm">Loading...</p>}
        {err && <p className="text-sm text-red-600">{err}</p>}

        {details && (
          <div className="mt-2 text-sm text-gray-700">
            <div>{details.name}</div>
            <div>{details.location || '—'}</div>
            <div>Repos: {details.public_repos}</div>
            <div className="mt-1"><a className="text-blue-600" href={details.html_url} target="_blank" rel="noreferrer">Open profile</a></div>
          </div>
        )}
      </div>
    </article>
  )
}
