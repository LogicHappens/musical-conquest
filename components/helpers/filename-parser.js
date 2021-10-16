export const filenameParser = (filename) => {
  const lastPeriodIndex = filename.lastIndexOf('.')
  const file = filename.substring(0, lastPeriodIndex)
  const extension = filename.substring(lastPeriodIndex + 1)
  return { file, extension }
}

export const musicFilenameParser = (filename) => {
  const { file, extension } = filenameParser(filename)
  const nameParts = file.split(' - ')
  const [artist, song, hash1, hash2] = nameParts
  const hash = hash2 || hash1
  const isSong = extension === 'mp3'

  return {
    artist,
    song,
    hash,
    hash1,
    hash2,
    filename: file,
    extension,
    isSong,
  }
}
