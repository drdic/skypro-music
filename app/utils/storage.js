const ACCESS_KEY = 'skypro-music-access'
const REFRESH_KEY = 'skypro-music-refresh'
const USER_KEY = 'skypro-music-user'

function read(key) {
  if (typeof window === 'undefined') return ''
  try {
    return window.localStorage.getItem(key) || ''
  } catch {
    return ''
  }
}

function write(key, value) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, value)
  } catch {
    return
  }
}

function remove(key) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(key)
  } catch {
    return
  }
}

export function readTokens() {
  return { access: read(ACCESS_KEY), refresh: read(REFRESH_KEY) }
}

export function saveTokens(access, refresh) {
  write(ACCESS_KEY, access || '')
  write(REFRESH_KEY, refresh || '')
}

export function clearTokens() {
  remove(ACCESS_KEY)
  remove(REFRESH_KEY)
  remove(USER_KEY)
}

export function readUser() {
  const raw = read(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function saveUser(user) {
  write(USER_KEY, JSON.stringify(user || null))
}
