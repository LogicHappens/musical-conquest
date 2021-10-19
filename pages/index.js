import Head from 'next/head'
import styles from '../styles/Home.module.sass'
import Player from '../components/player'
import SearchAndResults from '../components/search-and-results'
import Playlist from '../components/playlist'
import { useCallback, useContext, useEffect, useState } from 'react'
import {
  SONGS_BASE_URL,
  SONGS_LOCAL_STORAGE_KEY,
  SONGS_URL,
} from '../components/helpers/constants'
import axios from 'axios'
import { musicFilenameParser } from '@/components/helpers/filename-parser'
import { Howl } from 'howler'
import { catalogSongs } from '@/components/helpers/catalog-songs'
import { useRouter } from 'next/router'
import { Context } from '../components/helpers/context'

export default function Home() {
  const { currentSong, setCurrentSong } = useContext(Context)
  const [audio, setAudio] = useState()
  const [catalog, setCatalog] = useState([])
  const router = useRouter()

  const parseFiles = (files) => files.split('\n').map(musicFilenameParser)
  const getUrlSongHash = useCallback(
    () => router.asPath.split('/#')[1],
    [router.asPath],
  )

  const [lastHash, setLastHash] = useState(getUrlSongHash())

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
      parseFiles(data)
    })
  }, [])

  useEffect(() => {
    if (currentSongHash === '') return
    const { song } = catalog.get(currentSongHash)

    const songUrl =
      SONGS_BASE_URL + encodeURIComponent(song.filename) + '.' + song.extension

    if (audio) audio.unload()
    const howl = new Howl({
      src: [songUrl],
      html5: true,
      preload: 'metadata',
    })
    howl.play()

    setAudio(howl)

    if (lastHash !== song.hash) {
      router.push(`/#${song.hash}`, undefined, { shallow: true })
      setLastHash(song.hash)
    }
  }, [catalog, currentSongHash, lastHash, router])

  return (
    <div className={styles.container}>
      <Head>
        <title>Musical Conquest</title>
        <meta name="description" content="Musical Conquest" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <div className={styles.left}>
          <Player song={currentSongHash} audio={audio} />
          <SearchAndResults catalog={catalog} />
        </div>
        <div className={styles.right}>
          <Playlist />
        </div>
      </div>
    </div>
  )
}
