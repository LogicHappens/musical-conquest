import axios from 'axios'
import { createContext, useCallback, useEffect, useState } from 'react'
import { SONGS_LOCAL_STORAGE_KEY, SONGS_URL } from './constants'
import { musicFilenameParser } from './filename-parser'
import { catalogSongs } from './catalog-songs'
import { useRouter } from 'next/router'
export const Context = createContext()

export const Provider = ({ children }) => {
  const router = useRouter()
  const [audio, setAudio] = useState()
  const [catalog, setCatalog] = useState([])
  const [currentSong, setCurrentSong] = useState()
  const [currentSongHash, setCurrentSongHash] = useState('')

  const parseFiles = (files) => files.split('\n').map(musicFilenameParser)

  const getUrlSongHash = useCallback(
    () => router.asPath.split('/#')[1],
    [router.asPath],
  )

  useEffect(() => {
    const filenames = localStorage.getItem(SONGS_LOCAL_STORAGE_KEY)
    if (filenames) {
      const songs = parseFiles(filenames)
      const catalog = catalogSongs(songs)
      const keys = Array.from(catalog.keys())
      const loadKey = getUrlSongHash()
      const loadExists = loadKey && catalog.has(loadKey)
      const randomKey = keys[Math.floor(Math.random() * keys.length)]
      const songKey = loadExists ? loadKey : randomKey

      setCatalog(catalog)
      setCurrentSongHash(songKey)
      return
    }

    axios.get(SONGS_URL).then(({ data }) => {
      localStorage.setItem(SONGS_LOCAL_STORAGE_KEY, data)
    })
  }, [])

  const value = {
    audio,
    setAudio,
    catalog,
    currentSong,
    setCurrentSong,
    currentSongHash,
    setCurrentSongHash,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}
