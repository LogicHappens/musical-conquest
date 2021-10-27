import axios from 'axios'
import { createContext, useCallback, useEffect, useRef, useState } from 'react'
import { SONGS_LOCAL_STORAGE_KEY, SONGS_URL } from './constants'
import { musicFilenameParser } from './filename-parser'
import { catalogSongs } from './catalog-songs'
import { useRouter } from 'next/router'
export const Context = createContext()

const parseFiles = (files) => files.split('\n').map(musicFilenameParser)

export const Provider = ({ children }) => {
  const router = useRouter()
  const [audio, setAudio] = useState()
  const [catalog, setCatalog] = useState(new Map())
  const [currentSong, setCurrentSong] = useState()
  const [currentSongHash, setCurrentSongHash] = useState()

  const getUrlSongHash = useCallback(
    () => router.asPath.split('/#')[1],
    [router.asPath],
  )

  const shuffleKey = useCallback(() => {
    const keys = Array.from(catalog.keys())
    const randomKey = keys[Math.floor(Math.random() * keys.length)]
    return randomKey
  }, [catalog])

  // Load catalog
  useEffect(() => {
    const catalogued = (filenames) => {
      const songs = parseFiles(filenames)
      const catalog = catalogSongs(songs)
      return catalog
    }

    const filenames = localStorage.getItem(SONGS_LOCAL_STORAGE_KEY)
    if (filenames) {
      const cataloguedSongs = catalogued(filenames)
      setCatalog(cataloguedSongs)
    } else {
      axios.get(SONGS_URL).then(({ data }) => {
        localStorage.setItem(SONGS_LOCAL_STORAGE_KEY, data)
        const cataloguedSongs = catalogued(data)
        setCatalog(cataloguedSongs)
      })
    }
  }, [])

  // Load initial song key
  useEffect(() => {
    if (catalog.size === 0) return

    const loadKey = getUrlSongHash()
    const loadExists = loadKey && catalog.has(loadKey)
    const randomKey = shuffleKey()
    const songKey = loadExists ? loadKey : randomKey

    setCurrentSongHash(songKey)
  }, [catalog, getUrlSongHash, shuffleKey])

  // Load song from hash
  useEffect(() => {
    const catalogItem = catalog.get(currentSongHash)
    setCurrentSong(catalogItem)
  }, [catalog, currentSongHash])

  const shuffle = () => {
    setCurrentSongHash(shuffleKey())
  }

  const value = {
    audio,
    setAudio,
    catalog,
    currentSong,
    setCurrentSong,
    currentSongHash,
    setCurrentSongHash,
    shuffle,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}
