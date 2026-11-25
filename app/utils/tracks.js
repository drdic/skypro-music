export const UNKNOWN = 'Неизвестно'

export const SORT_OPTIONS = ['По умолчанию', 'Сначала новые', 'Сначала старые']

export function getAuthor(track) {
  const author = String(track?.author || '').trim()
  return !author || author === '-' ? UNKNOWN : author
}

export function getYear(track) {
  const year = String(track?.release_date || '').split('-')[0]
  return year || UNKNOWN
}

export function getGenres(track) {
  const genre = track?.genre
  if (Array.isArray(genre)) {
    return genre.filter(Boolean).map((item) => String(item).trim())
  }
  return genre ? [String(genre).trim()] : []
}

export function sortWithUnknownLast(items, compare) {
  return [...items].sort((a, b) => {
    if (a === UNKNOWN) return 1
    if (b === UNKNOWN) return -1
    return compare(a, b)
  })
}

export function filterTracks(tracks, filters) {
  const query = String(filters.searchQuery || '')
    .trim()
    .toLowerCase()

  const result = (tracks || []).filter((track) => {
    if (query && !String(track.name || '').toLowerCase().includes(query)) return false

    if (filters.authors.length && !filters.authors.includes(getAuthor(track))) return false

    if (filters.years.length && !filters.years.includes(getYear(track))) return false

    if (filters.genres.length) {
      const genres = getGenres(track)
      if (!genres.some((item) => filters.genres.includes(item))) return false
    }

    return true
  })

  if (filters.sort === SORT_OPTIONS[1]) {
    result.sort((a, b) => String(b.release_date || '').localeCompare(String(a.release_date || '')))
  }

  if (filters.sort === SORT_OPTIONS[2]) {
    result.sort((a, b) => String(a.release_date || '').localeCompare(String(b.release_date || '')))
  }

  return result
}
