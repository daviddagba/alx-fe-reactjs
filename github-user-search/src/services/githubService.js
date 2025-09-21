// src/services/githubService.js
import axios from 'axios'

const BASE = 'https://api.github.com'
const token = import.meta.env.VITE_APP_GITHUB_API_KEY

const client = axios.create({
  baseURL: BASE,
  headers: token ? { Authorization: `token ${token}` } : undefined,
  timeout: 10000
})

/**
 * Search users (Search API)
 * @param {string} query
 * @returns {Promise<Object>} response.data (contains items array)
 */
export async function searchUsers(query) {
  if (!query) return { items: [] }
  const resp = await client.get('/search/users', { params: { q: query, per_page: 20 } })
  return resp.data
}

/**
 * Fetch a single user's profile by username
 * @param {string} username
 * @returns {Promise<Object>} user object
 * Throws an error with isNotFound=true if 404
 */
export async function fetchUserData(username) {
  if (!username) throw new Error('username is required')
  try {
    const resp = await client.get(`/users/${encodeURIComponent(username)}`)
    return resp.data
  } catch (err) {
    if (err.response && err.response.status === 404) {
      const e = new Error('Not Found')
      e.isNotFound = true
      throw e
    }
    throw err
  }
}
