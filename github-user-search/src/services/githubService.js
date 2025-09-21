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
 * Build a GitHub Search API q=... string with advanced filters.
 * Accepts: query (string), location (string), minRepos (number)
 */
function buildSearchQuery({ query = '', location, minRepos }) {
  // start with main query string (if empty, search all users; include keyword)
  const parts = []
  if (query && query.trim()) parts.push(query.trim())
  if (location && location.trim()) parts.push(`location:${location.trim()}`)
  if (minRepos && Number(minRepos) > 0) parts.push(`repos:>=${Number(minRepos)}`)
  // if nothing provided, fallback to search for "followers:>0" to avoid blank q
  if (!parts.length) parts.push('followers:>0')
  return parts.join(' ')
}

/**
 * Search users using the GitHub Search API with optional filters and pagination.
 * @param {Object} opts
 * @param {string} opts.query - main query text or username
 * @param {string} opts.location - optional location filter
 * @param {number} opts.minRepos - minimum public repos
 * @param {number} opts.page - page number (1-based)
 * @param {number} opts.per_page - results per page (max 100)
 * @returns {Promise<Object>} response.data (contains items array, total_count)
 */
export async function searchUsers({ query = '', location, minRepos, page = 1, per_page = 30 } = {}) {
  const q = buildSearchQuery({ query, location, minRepos })
  const resp = await client.get('/search/users', {
    params: { q, page, per_page },
  })
  return resp.data
}

/**
 * Fetch a single user's profile by username (for details)
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
