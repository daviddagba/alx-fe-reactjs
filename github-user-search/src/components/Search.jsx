// src/components/Search.jsx
import React, { useState } from 'react'
import { fetchUserData } from '../services/githubService'

export default function Search() {
  const [input, setInput] = useState('')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    const username = input.trim()
    if (!username) return

    setLoading(true)
    setError(null)
    setUser(null)

    try {
      const data = await fetchUserData(username)
      setUser(data)
    } catch (err) {
      // show the exact error message requested if user not found
      if (err.isNotFound) {
        setError('Looks like we cant find the user') // exact message required
      } else {
        setError('Looks like we cant find the user')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="search-section">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          aria-label="Search GitHub username"
          placeholder="Enter GitHub username"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Conditional rendering */}
      {loading && <p>Loading...</p>} {/* exact text */}
      {!loading && error && <p role="alert">{error}</p>} {/* exact error text */}

      {!loading && user && (
        <article className="user-result">
          <img
            src={user.avatar_url}
            alt={`${user.login} avatar`}
            width="128"
            height="128"
            style={{ borderRadius: '8px' }}
          />
          <div className="user-info">
            <h2>{user.name || user.login}</h2>
            {user.name && <p className="muted">@{user.login}</p>}
            {user.bio && <p>{user.bio}</p>}
            <p>
              <a href={user.html_url} target="_blank" rel="noreferrer">
                View GitHub profile
              </a>
            </p>
            <p>
              <strong>Followers:</strong> {user.followers} &nbsp;
              <strong>Following:</strong> {user.following} &nbsp;
              <strong>Public Repos:</strong> {user.public_repos}
            </p>
          </div>
        </article>
      )}
    </section>
  )
}
