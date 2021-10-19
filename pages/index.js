import Head from 'next/head'
import styles from '../styles/Home.module.sass'
import Player from '../components/player'
import SearchAndResults from '../components/search-and-results'
import Playlist from '../components/playlist'
import { useCallback, useEffect, useState } from 'react'
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

export default function Home() {
  const [currentSong, setCurrentSong] = useState({})
  const [audio, setAudio] = useState()
  const [catalog, setCatalog] = useState([])
  const router = useRouter()

  const parseFiles = (files) => files.split('\n').map(musicFilenameParser)
  const getSongUrl = useCallback(
    () => router.asPath.split('/#')[1],
    [router.asPath],
  )

  useEffect(() => {
    const filenames = localStorage.getItem(SONGS_LOCAL_STORAGE_KEY)
    if (filenames) {
      const songs = parseFiles(filenames)
      const catalog = catalogSongs(songs)
      const keys = Array.from(catalog.keys())
      const loadKey = getSongUrl()
      const loadExists = loadKey && catalog.has(loadKey)
      const randomKey = keys[Math.floor(Math.random() * keys.length)]
      const songKey = loadExists ? loadKey : randomKey
      const getSong = catalog.get(songKey)

      const songUrl =
        SONGS_BASE_URL +
        encodeURIComponent(getSong.song.filename) +
        '.' +
        getSong.song.extension

      const audio = new Howl({
        src: [songUrl],
        html5: true,
        preload: 'metadata',
      })
      audio.play()

      router.push(`/#${songKey}`, undefined, { shallow: true })

      setAudio(audio)
      setCatalog(catalog)
      setCurrentSong(getSong)
      return
    }

    axios.get(SONGS_URL).then(({ data }) => {
      localStorage.setItem(SONGS_LOCAL_STORAGE_KEY, data)
      parseFiles(data)
    })
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Musical Conquest</title>
        <meta name="description" content="Musical Conquest" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <div className={styles.left}>
          <Player song={currentSong} audio={audio} />
          <SearchAndResults catalog={catalog} />
        </div>
        <div className={styles.right}>
          <Playlist />
        </div>
      </div>
    </div>
  )
}
