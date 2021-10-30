export const hydrateFromHashes = (hashes, catalog) => {
  return hashes.map((hash) => catalog.get(hash))
}
