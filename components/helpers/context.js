import { createContext, useCallback, useEffect, useState } from 'react'
import { SONGS_LOCAL_STORAGE_KEY, SONGS_URL } from './constants'
import { musicFilenameParser } from './filename-parser'
import { catalogSongs } from './catalog-songs'
import { useRouter } from 'next/router'
import { Howl as _Howl } from 'howler'
export const Context = createContext()

const parseFiles = (files) => files.split('\n').map(musicFilenameParser)

export const Provider = ({ children }) => {
  const router = useRouter()

  /** @type {[_Howl]} */
  const [audio, setAudio] = useState()
  const [catalog, setCatalog] = useState(new Map())
  const [currentSong, setCurrentSong] = useState()
  const [currentSongHash, setCurrentSongHash] = useState()
  const [currentDuration, setCurrentDuration] = useState(0)
  const [duration, setDuration] = useState(0)

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
      fetch(SONGS_URL).then((response) => {
        response.text().then((data) => {
          localStorage.setItem(SONGS_LOCAL_STORAGE_KEY, data)
          const cataloguedSongs = catalogued(data)
          setCatalog(cataloguedSongs)
        })
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
    if (currentSongHash === undefined) return
    const catalogItem = catalog.get(currentSongHash)
    setCurrentSong(catalogItem)
  }, [catalog, currentSongHash])

  // Durations
  useEffect(() => {
    if (audio === undefined) return

    // Update currentDuration
    const update = setInterval(() => {
      setCurrentDuration(Math.round(audio?.seek()) || 0)
    }, 500)

    // Update duration
    audio.on('load', () => {
      setDuration(audio?.duration())
    })

    return function cleanup() {
      clearInterval(update)
    }
  }, [audio])

  const shuffle = () => setCurrentSongHash(shuffleKey())

  const play = () => !audio.playing() && audio.play()

  const value = {
    audio,
    setAudio,
    catalog,
    currentSong,
    setCurrentSong,
    currentSongHash,
    setCurrentSongHash,
    currentDuration,
    duration,
    shuffle,
    play,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}
