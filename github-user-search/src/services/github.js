import axios from 'axios'

const BASE = 'https://api.github.com'

const token = import.meta.env.VITE_APP_GITHUB_API_KEY
const client = axios.create({
  baseURL: BASE,
  headers: token ? { Authorization: `token ${token}` } : undefined
})

export async function searchUsers(q) {
  // GitHub Search Users API: GET /search/users?q={query}
  const response = await client.get('/search/users', {
    params: { q, per_page: 20 }
  })
  return response.data
}
