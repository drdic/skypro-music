const baseURL = typeof __APP_BASE_URL__ === 'string' ? __APP_BASE_URL__.trim() : '/'

export function publicPath(path) {
  return `${baseURL.replace(/\/+$/, '')}/${path.replace(/^\//, '')}`
}

export default publicPath
