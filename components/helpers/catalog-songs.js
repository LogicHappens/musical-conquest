/**
 * @param {string[]} files
 * @returns {Map<string, CatalogEntry>}
 */
export const catalogSongs = (files) =>
  files.reduce((catalog, file) => {
    const key = file.hash

    if (!catalog.has(key)) {
      catalog.set(key, new CatalogEntry())
    }

    /** @type {CatalogEntry} */
    const catalogEntry = catalog.get(key)

    if (file.isSong) {
      catalogEntry.setSong(file)
    } else {
      catalogEntry.addImage(file)
    }

    return catalog
  }, new Map())

class CatalogEntry {
  #song = {}
  #images = []

  constructor() {}

  get song() {
    return this.#song
  }

  get images() {
    return this.#images
  }

  setSong(song) {
    this.#song = song
  }

  addImage(image) {
    this.#images.push(image)
  }
}
