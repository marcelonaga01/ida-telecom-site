// Explicit origin avoids relying on forwarded headers supplied by clients.
export function publicOrigin(requestUrl, configuredOrigin) {
  const url = new URL(configuredOrigin || requestUrl);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || (configuredOrigin && (url.pathname !== '/' || url.search || url.hash))) {
    throw new Error('RF_PUBLIC_ORIGIN deve conter somente a origem pública do site.');
  }
  return url.origin;
}
