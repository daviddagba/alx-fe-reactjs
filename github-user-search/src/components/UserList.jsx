import React from 'react'
import UserCard from './UserCard'

export default function UserList({ users = [] }) {
  if (!users.length) return <p>No results</p>
  return (
    <section className="user-list">
      {users.map((u) => <UserCard key={u.id} user={u} />)}
    </section>
  )
}
