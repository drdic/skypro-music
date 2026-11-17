export function publicPath(path) {
  return `/${path.replace(/^\//, '')}`
}

export default publicPath
