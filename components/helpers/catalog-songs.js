export const catalogSongs = (files) =>
  files.reduce((catalog, file) => {
    const key = file.hash

    if (!catalog.has(key)) {
      catalog.set(key, { song: {}, images: [] })
    }

    const catalogEntry = catalog.get(key)

    // TODO: we don't need everything stored
    // TODO: images should be keyed into their own map too?
    // Nah this is already a hash right there
    if (file.isSong) {
      catalogEntry.song = file
    } else {
      catalogEntry.images.push(file)
    }

    return catalog
  }, new Map())
