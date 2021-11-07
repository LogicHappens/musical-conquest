import { SONGS_BASE_URL } from './constants'

export const filenameParser = (filename) => {
  const lastPeriodIndex = filename.lastIndexOf('.')
  const file = filename.substring(0, lastPeriodIndex)
  const extension = filename.substring(lastPeriodIndex + 1)
  return { file, extension }
}

/**
 * @param {string} filename
 * @returns {Resource}
 */
export const musicFilenameParser = (filename) => {
  const { file, extension } = filenameParser(filename)
  const nameParts = file.split(' - ')
  const [artist, song, hash1, hash2] = nameParts
  const hash = hash2 || hash1
  const isSong = extension === 'mp3'

  return new Resource(artist, song, hash, hash1, hash2, file, extension, isSong)
}

class Resource {
  artist
  song
  hash
  hash1
  hash2
  filename
  extension
  isSong

  constructor(artist, song, hash, hash1, hash2, filename, extension, isSong) {
    this.artist = artist
    this.song = song
    this.hash = hash
    this.hash1 = hash1
    this.hash2 = hash2
    this.filename = filename
    this.extension = extension
    this.isSong = isSong
  }

  get url() {
    const file = encodeURIComponent(this.filename) + '.' + this.extension
    return SONGS_BASE_URL + file
  }
}
