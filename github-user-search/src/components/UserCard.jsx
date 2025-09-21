import React from 'react'

export default function UserCard({ user }) {
  return (
    <div className="user-card">
      <img src={user.avatar_url} alt={`${user.login} avatar`} width="64" height="64" />
      <div>
        <a href={user.html_url} target="_blank" rel="noreferrer">{user.login}</a>
        <div>Score: {user.score ? user.score.toFixed(2) : '—'}</div>
      </div>
    </div>
  )
}
